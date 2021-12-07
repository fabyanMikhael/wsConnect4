exports.WS_Server = {
    //main menu
    CreateRoom: "CreateRoom", // (string name, callback(gamestate) on_success)
    JoinRoom: "JoinRoom", // (int room_id, string name, callback(gamestate) on_success)

    //when in a game...
    TryMove: "TryMove", // (int column)
    LeaveRoom: "LeaveRoom", // ()
}

exports.WS_Client = {
    //when in a game
    GameState: "GameState", // (GameState state)

    //info
    PlayerCount: "PlayerCount" // (int count)
}