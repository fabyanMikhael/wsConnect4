const { WS_Client, WinCondition, WS_Server } =  require("../wsEnums");
const NAME_LENGTH = 10;
const ROOM_ID_LENGTH = 5;

class Game{
    constructor(player1, name1, room_id){
        this.p1 = {socket: player1, emoji: 1, name: name1};
        this.p2 = {socket: null, emoji: 2, name: null};
        this.board = [];
        this.room_id = room_id;
        this.turn = this.p2;
        this.over = false;
        this.winner = -1;
        this.moves = 0;
        for (let i = 0; i < 6; i++){
            this.board.push([0, 0, 0, 0, 0, 0, 0])
        }
        this.EmitState();
    }

    RegisterUser(player){
        player.socket.on(WS_Server.TryMove, column => {
            if (!(column >= 0 && column <= 6)) return;
            if (this.over) return;
            if (this.turn != player) return;
            for (let row = 5; row >= 0; row--){
                if (this.board[row][column] == 0){
                    this.board[row][column] = player.emoji;
                    this.moves += 1;
                    this.turn = player == this.p1 ? this.p2 : this.p1;
                    if (this.CheckWin(player, row, column)) return;
                    this.EmitState();
                    return;
                }
            }
        });
        player.socket.on(WS_Server.Rematch, () => {
            if(!this.over) return;
            if(this.p1.socket == null || this.p2.socket == null) return;
            this.p2.emoji = 1;
            this.p1.emoji = 2;
            this.ResetGame(this.p2, this.p1);
        });
    }

    EmitState(){
        if(this.p1.socket !== null)
            this.p1.socket.emit(WS_Client.GameState, this.State(this.p1));
        if(this.p2.socket !== null)
            this.p2.socket.emit(WS_Client.GameState, this.State(this.p2));
    }

    State(player){
        let player_index = player == this.p1 ? 1 : 2;
        let other = player_index == 1 ? this.p2 : this.p1;
        let state = "ongoing";
        if (this.over){
            if(this.winner == -1){
                state = "tie";
            }
            else if (this.winner == -2){
                state = "forfeit";
            }
            else{
                state = this.winner == player_index ? "won" : "lost";
            }
        }
        else if (this.p2.socket == null) state = "waiting";
        return {
            self:  {name: player.name, emoji: player.emoji, wins: player.socket.wins},
            other: {name: other.name, emoji: other.emoji, wins: (other.socket == null ? 0 : other.socket.wins) },
            board: this.board,
            turn: player == this.turn,
            room_id: this.room_id,
            state: state
           };
    }

    ResetGame(p1,p2){
        this.p1 = p1;
        this.p2 = p2;
        this.board = [];
        for (let i = 0; i < 6; i++){
            this.board.push([0, 0, 0, 0, 0, 0, 0])
        };
        this.turn = this.turn;
        this.over = false;
        this.winner = -1;
        this.moves = 0;
        this.EmitState();
    }
    

    EndGame(winner){
        this.over = true;
        this.winner = winner;
        if(winner == 1) this.p1.socket.wins += 1;
        if(winner == 2) this.p2.socket.wins += 1;
        this.EmitState();
    }

    CheckWin(player, row, column){
        if (this.moves >= 42){
            this.EndGame(-1);
            return;
        }
        let player_index = player == this.p1 ? 1 : 2;
        for (let x = 0; x < 7; x++){
            let sum = 0;
            for (let i = 0; i < 4; i++){
                let cell = this.GetCell(row, x+i)
                if (cell != player_index) break;
                sum += 1;
            }
            if (sum == 4){
                this.EndGame(player_index);
                return true;
            }
        }
        for (let x = 0; x < 6; x++){
            let sum = 0;
            for (let i = 0; i < 4; i++){
                let cell = this.GetCell(x+i, column);
                if (cell == 0 || cell != player_index) break;
                sum += 1;
            }
            if (sum == 4){
                this.EndGame(player_index);
                return true;
            }
        } 

        let offsets = [[-3,-3], [-2,-2], [-1,-1], [0,0], [1,1], [2,2], [3,3]];
        let offsets_2 = [[0,0], [1,1], [2,2], [3,3], [4,4]];
        for (const [a,b] of offsets){
            let x = row + a;
            let y = column + b;
            let sum = 0;
            for (const [i,j] of offsets_2){
                let cell = this.GetCell(x+i, y+j);
                if (cell == 0 || cell != player_index) break;
                sum += 1;
            }
            if (sum == 4){
                this.EndGame(player_index);
                return true;
            }
        }


        offsets = [[3,-3], [2,-2], [1,-1], [0,0], [-1,1], [-2,2], [-3,3]];
        offsets_2 = [[0,0], [-1,1], [-2,2], [-3,3], [-4,4]];
        for (const [a,b] of offsets){
            let x = row + a;
            let y = column + b;
            let sum = 0;
            for (const [i,j] of offsets_2){
                let cell = this.GetCell(x+i, y+j);
                if (cell == 0 || cell != player_index) break;
                sum += 1;
            }
            if (sum == 4){
                this.EndGame(player_index);
                return true;
            }
        }

        
        return false;
    }

    GetCell(row,column){
        if (row < 0 || row > 5) return 0;
        if (column < 0 || column > 6) return 0;
        return this.board[row][column];
    }

}

exports.GameManager = class GameManager{
    constructor(){
        this.games = {};
    }
    Setup(socket){
        socket.wins = 0;
        socket.on(WS_Server.CreateRoom, (name, callback) => this.CreateRoom(socket, name, callback));
        socket.on(WS_Server.JoinRoom, (room_id, name, callback) => this.JoinRoom(room_id, socket, name, callback));
    }

    CreateRoom(socket, name, callback = () => {}){
        if (name.length > NAME_LENGTH) return;
        let code = makeid(ROOM_ID_LENGTH);
        while (this.games[code] != null){
            code = makeid(ROOM_ID_LENGTH);
        }
        let room = new Game(socket, name, code);
        this.games[room.room_id] = room;

        room.RegisterUser(room.p1);
        callback();

        let player = room.p1;
        let disconnect = () => {
            delete this.games[room.room_id];
            player.socket = null;
            room.EndGame(-2);
        };

        socket.on("disconnect", disconnect);
        socket.on(WS_Server.LeaveRoom, disconnect);
        room.EmitState();
    }

    JoinRoom(room_id, socket, name, callback = () => {}){
        if (name.length > NAME_LENGTH) return;
        if (!room_id in this.games)
            return;

        let room = this.games[room_id];

        if (room == null) 
            return;

        if (room.p2.socket != null)
            return;

        room.p2.socket = socket;
        room.p2.name = name;
        room.RegisterUser(room.p2);
        callback();

        let player = room.p2;
        let disconnect = () => {
            delete this.games[room.room_id];
            player.socket = null;
            room.EndGame(-2);
        };
        
        socket.on("disconnect", disconnect);
        socket.on(WS_Server.LeaveRoom, disconnect);
        room.EmitState();
    }
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}