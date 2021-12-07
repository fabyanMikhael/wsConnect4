exports.WS_Server = {
    CreateRoom: "CreateRoom", // (string name, callback(gamestate) on_success)
    JoinRoom: "JoinRoom", // (int room_id, string name, callback(gamestate) on_success)

    //when in a game...
    TryMove: "TryMove", // (int row, int column)
}

exports.WS_Client = {
    GameState: "GameState" // (GameState state)
}