<script>
  import { fly } from "svelte/transition";
  import { game, started, Socket } from "./stores";
  import { WS_Server } from "../../wsEnums";
  import { onMount } from "svelte";

  import Cell from "./Cell.svelte";

  function leave() {
    $Socket.emit(WS_Server.LeaveRoom);
    started.set(false);
  }

  function rematch() {
    $Socket.emit(WS_Server.Rematch);
  }

  function get_state() {
    switch ($game.state) {
      case "tie":
        return "Draw";
      case "forfeit":
        return "Opponent Left The Match";
      case "waiting":
        return "Waiting For Opponent";
      default:
        return `You ${$game.state.charAt(0).toUpperCase()}${$game.state.slice(
          1
        )}`;
    }
  }

  onMount(() => {
    new ClipboardJS(".room_id");
  });
</script>

<!-- html -->
<div in:fly={{ y: 140, duration: 800 }} class="outter">
  <div class="inner">
    <div class="everything">
      <div>
        <h1 class="title">Connect 4</h1>
        <div class="topper">
          <h2 class="back" on:click={leave}><i class="fas fa-arrow-left" /></h2>
          <h2 class="id">
            room: <b data-clipboard-text={$game.room_id} class="room_id"
              >{$game.room_id}</b
            >
          </h2>
          <h2 class="back"><i class="fas fa-eye" /></h2>
        </div>
      </div>
      <div class="board">
        {#if $game.state !== "ongoing"}
          <div in:fly={{ y: 140, duration: 800 }} class="overlay">
            <h1>{get_state()}</h1>

            {#if $game.state !== "waiting"}
              <h2 class="history">
                <div class={`circle cc e${$game.other.emoji}`} />
                <div>
                  {$game.other.wins} <i class="fas fa-trophy gold" />
                  {$game.self.wins}
                </div>
                <div class={`circle cc e${$game.self.emoji}`} />
              </h2>

              <div class="actions">
                <h2 on:click={leave}>leave</h2>
                {#if $game.state !== "forfeit"}
                  <h2 on:click={rematch}>rematch</h2>
                {/if}
              </div>
            {/if}
          </div>
        {/if}

        {#each $game.board as row}
          {#each row as emoji, column}
            <Cell {emoji} {column} />
          {/each}
        {/each}
      </div>
      <div class="footer">
        <div class="person">
          <div class="name">
            <div class={`circle cc e${$game.other.emoji}`} />
            <p>{$game.other.name || "invite a friend"}</p>
          </div>
          {#if !$game.turn}
            <h2 in:fly={{ y: 50, duration: 800 }}>Opponent's Turn</h2>
          {:else}
            <h2>&nbsp;</h2>
          {/if}
        </div>
        <div class="person">
          <div class="name">
            <p>{$game.self.name || ""}</p>
            <div class={`circle cc e${$game.self.emoji}`} />
          </div>
          {#if $game.turn}
            <h2 in:fly={{ y: 50, duration: 800 }}>Your Turn</h2>
          {:else}
            <h2>&nbsp;</h2>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .title {
    margin: 0;
    user-select: none;
  }

  .id {
    margin-bottom: 0.8rem;
    font-size: 1rem;
    color: rgb(173, 173, 173);
  }

  .back {
    margin-bottom: 0.8rem;
    font-size: 1.2rem;
    transition: all 100ms;
    cursor: pointer;
  }

  .back:hover {
    color: rgb(149, 149, 149);
  }

  .back:active {
    color: rgb(81, 81, 81);
  }

  .room_id {
    cursor: pointer;
    transition: all 100ms;
  }

  .room_id:hover {
    color: rgb(149, 149, 149);
  }

  .room_id:active {
    color: rgb(69, 69, 69);
  }

  .id b {
    color: rgb(108, 108, 108);
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

  .board {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 50px);
    grid-template-rows: repeat(6, 50px);
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.5rem;
    /* margin: 2px; */
  }

  .topper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2px;
  }

  .name {
    display: flex;
    align-items: center;
    user-select: none;
  }

  .name p {
    display: flex;
    align-items: center;
    user-select: none;
  }

  .emoji {
    font-size: 1.5rem;
    user-select: none;
  }

  .name * {
    margin: 0rem 0.2rem;
  }

  .cc {
    width: 1.5rem;
    height: 1.5rem;
    box-shadow: none;
  }

  .person {
    display: flex;
    flex-direction: column;
  }

  .person h2 {
    font-size: 0.8rem;
    color: rgb(105, 105, 105);
  }

  .overlay {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: absolute;
    z-index: 10;
    margin-left: -0.5rem;
    margin-top: 2.5rem;
    padding: 1rem;

    width: 334.61px;
    max-width: 334.61px;

    /* bottom: 50%; */
    background-color: rgba(255, 255, 255, 0.861);
    box-shadow: 0px 5px 10px 2px rgb(220, 220, 220);
    border-radius: 5px;
    user-select: none;
  }

  .overlay h1 {
    font-size: 1.5rem;
  }
  .gold {
    color: #ffc124;
  }

  .history {
    margin: 0;
    margin-bottom: 1rem;
    gap: 0.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: rgb(105, 105, 105);
  }

  .actions {
    margin: 0;
    margin-bottom: 1rem;
    gap: 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: rgb(105, 105, 105);
  }

  .actions h2 {
    margin: 0;
    font-size: 1.2rem;
    cursor: pointer;
  }

  .actions :hover {
    color: rgb(149, 149, 149);
  }

  .actions :active {
    color: rgb(69, 69, 69);
  }
</style>
