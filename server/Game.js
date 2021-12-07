const { WS_Client, WinCondition, WS_Server } =  require("../wsEnums");

class Game{
    constructor(player1, name1, room_id){
        this.p1 = {socket: player1, emoji: '😇', name: name1};
        this.p2 = {socket: null, emoji: '🤓', name: null};
        this.board = [];
        this.room_id = room_id;
        this.turn = this.p2;
        this.over = false;
        this.winner = -1;
        for (let i = 0; i < 6; i++){
            this.board.push(['', '', '', '', '', '', ''])
        }
        this.EmitState();
    }

    RegisterUser(user, side){
        let player = side == 1? this.p1 : this.p2;
        user.socket.on(WS_Server.TryMove, (row,column) => {
            this.board[row][column] = player.emoji;
            this.EmitState();
        });
    }

    EmitState(){
        this.p1.socket.emit(WS_Client.GameState, this.State(this.p1));
        this.p2.socket.emit(WS_Client.GameState, this.State(this.p2));
    }

    State(player){
        if (player.socket == null) return;
        let player_index = player == this.p1 ? 1 : 2;
        let other = player_index == 1 ? this.p2 : this.p1;
        let state = "ongoing";
        if (this.over){
            if(this.winner == -1){
                state = "tie";
            }
            else{
                state = this.winner == player_index ? "won" : "lost";
            }
        }
        
        return {
            self:  {name: player.name, emoji: player.emoji},
            other: {name: other.name, emoji: other.emoji},
            board: this.board,
            turn: player == this.turn,
            room_id: this.room_id,
            state: state
           };
    }

    EndGame(winner){
        this.over = true;
        this.winner = winner;
        this.EmitState();
    }

}

exports.GameManager = class GameManager{
    constructor(){
        this.games = {};
    }
    Setup(socket){
        socket.on(WS_Server.JoinRoom,   (name, callback) => this.JoinRoom(socket, name, callback));
        socket.on(WS_Server.CreateRoom, (room_id, name, callback) => this.CreateRoom(room_id, socket, name, callback));
    }

    CreateRoom(socket, name, callback){
        let room = new Game(socket, name, makeid(23));
        this.games[room.room_id] = room;

        room.RegisterUser(room.p1, 1);
        callback(room.State(room.p1));
        socket.on("disconnect", () => {
        delete this.games[room.room_id];
        room.EndGame(-1);
        });
    }

    JoinRoom(room_id, socket, name, callback){

        if (!room_id in this.games) return;
        let room = this.games[room_id];
        if (room.p2 != null) return;

        room.p2 = {socket: socket, emoji: '🤓', name: name};

        room.RegisterUser(room.p2, 2);
        callback(room.State(room.p2));
        socket.on("disconnect", () => {
        delete this.games[room.room_id];
        room.EndGame(-1);
        });
    }
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}