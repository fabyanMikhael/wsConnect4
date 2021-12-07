<script>
  import { Socket } from "./stores";
  import { WS_Server } from "../../wsEnums";

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
          <input maxlength="20" placeholder="name..." bind:value={name} />
        </div>

        <div class="sec">
          <input maxlength="10" placeholder="room..." bind:value={room} />
        </div>

        <button class="btn" on:click={start}
          >{create_room ? "Create" : "Join"} Room</button
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
