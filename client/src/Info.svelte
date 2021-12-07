<script>
  import { fly } from "svelte/transition";
  import { Socket, started } from "./stores";

  let name, room;
  $: new_game = !(room && room.length > 0);

  function start() {
    if (name) {
      $Socket.on("GameState", (game_state) => console.log(game_state));

      if (new_game) {
        $Socket.emit("CreateRoom", name);
      } else {
        $Socket.emit("JoinRoom", room, name);
      }
      //   $Socket.on("connect", () => alert("connected!"));

      started.set(true);
    }
  }
</script>

<!-- html -->
<div class="outter">
  <div class="inner">
    <div class="everything">
      <div>
        <h1 class="title">Connect 4</h1>
      </div>
      <div class="form">
        <div class="sec">
          <input maxlength="22" placeholder="name..." bind:value={name} />
        </div>

        <div class="sec">
          <input maxlength="22" placeholder="room..." bind:value={room} />
        </div>

        <button class="btn" on:click={start}
          >{new_game ? "New Game" : "Join"}</button
        >
      </div>
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
