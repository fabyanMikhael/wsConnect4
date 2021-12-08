<script>
  import { fly } from "svelte/transition";
  import { Socket, player_count } from "./stores";
  import { WS_Server } from "../../wsEnums";

  let name, room;
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has("r")) {
    const r = urlParams.get("r");
    if (r.length <= 5) {
      room = r;
    }
  }

  let successful = true;

  $: create_room = !(room && room.length > 0);
  $: valid_name = name && name.length > 0 && successful;

  function start() {
    successful = false;
    if (name) {
      if (create_room) {
        $Socket.emit(WS_Server.CreateRoom, name, (gs) => {
          room = gs.room_id;
          add_room();
        });
      } else {
        $Socket.emit(WS_Server.JoinRoom, room, name, () => {
          add_room();
          successful = true;
        });
      }
    }
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  function add_room() {
    const new_url = `${window.location.protocol}//${window.location.host}?r=${room}`;
    window.history.replaceState({ path: new_url }, document.title, new_url);
  }

  function remove_room() {
    room = null;
    window.history.replaceState({}, document.title, window.location.pathname);
  }
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
          <input
            class={successful ? "" : "fail"}
            on:input={() => {
              successful = true;
            }}
            maxlength="5"
            size="14"
            placeholder="room..."
            bind:value={room}
          />
          <button class="btn smol" on:click={remove_room} disabled={!room}
            ><i class="fas fa-trash" /></button
          >
        </div>

        <button class="btn" on:click={start} disabled={!valid_name}
          >{create_room ? "Create" : "Join"} Room</button
        >
      </div>
      <h2 class="footer">
        <i class="fas fa-user" />
        {$player_count} active player{$player_count == 1 ? "" : "s"}
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

  .fail {
    color: rgb(178, 0, 0);
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
    /* width: 100%; */
    width: 100%;
    user-select: none;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 2px rgb(240, 240, 240);
    background-color: white;
    transition: all 100ms;
    outline: none;
    border: none;
    cursor: pointer;
  }

  .smol {
    width: 23%;
  }
  .fa-trash {
    cursor: pointer;
    pointer-events: none;
  }
</style>
