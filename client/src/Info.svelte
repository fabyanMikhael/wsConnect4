<script>
  import { fly } from "svelte/transition";
  import { Socket } from "./stores";
  import { WS_Server, WS_Client } from "../../wsEnums";

  let name, room;
  $: create_room = !(room && room.length > 0);

  function start() {
    if (name) {
      if (create_room) {
        $Socket.emit(WS_Server.CreateRoom, name);
      } else {
        $Socket.emit(WS_Server.JoinRoom, room, name);
      }
    }
  }

  let player_count = 0;
  $Socket.on(WS_Client.PlayerCount, (count) => (player_count = count));
</script>

<!-- html -->
<div in:fly={{ y: -140, duration: 800 }} class="outter">
  <div class="inner">
    <div class="everything">
      <div>
        <h1 class="title">Connect 4</h1>
      </div>
      <div class="form">
        <div class="sec">
          <input maxlength="10" placeholder="name..." bind:value={name} />
        </div>

        <div class="sec">
          <input maxlength="5" placeholder="room..." bind:value={room} />
        </div>

        <button class="btn" on:click={start}
          >{create_room ? "Create" : "Join"} Room</button
        >
      </div>
      <h2 class="footer">
        <i class="fas fa-user" />
        {player_count} active player{player_count == 1 ? "" : "s"}
      </h2>
    </div>
  </div>
</div>

<!-- styling -->
<style>
  .title {
    margin-bottom: 0.3rem;
    user-select: none;
  }

  .outter {
    height: 100vh;
    display: flex;
    align-content: center;
  }

  .inner {
    text-align: center;
    margin: auto;
  }

  .everything {
    margin-top: -5rem;
  }

  .form {
    text-align: left;
  }

  .sec {
    width: 100%;
  }

  .footer {
    font-size: 0.8rem;
    color: rgb(105, 105, 105);
  }

  input {
    border-radius: 5px;
  }

  .btn:hover {
    background-color: rgb(231, 231, 231);
  }

  .btn:active {
    background-color: rgb(207, 207, 207);
  }

  .btn {
    width: 100%;
    user-select: none;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 2px rgb(240, 240, 240);
    background-color: white;
    transition: all 100ms;
    outline: none;
    border: none;
  }
</style>
