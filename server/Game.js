
class Game{
    constructor(player1,player2){
        this.p1 = player1;
        this.p2 = player2;
        this.board = [];
        for (let i = 0; i < 6; i++){
            this.board.push(['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'])
        }
    }

}