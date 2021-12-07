export const WS_Server = {
    SetName = "SetName", //(string new_name)
    CreateRoom = "CreateRoom", // (callback on_success)
    ConnectToRoom = "ConnectToRoom", // (callback on_success)
}

export const WS_Client = {
    GameState = "GameState" // (GameState state)
}