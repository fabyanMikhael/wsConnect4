<script>
  import { fly } from "svelte/transition";
  import { game, started, Socket } from "./stores";
  import { WS_Server } from "../../wsEnums";
  import Cell from "./Cell.svelte";

  function leave() {
    $Socket.emit(WS_Server.LeaveRoom);
    started.set(false);
  }
</script>

<!-- html -->
<div in:fly={{ y: 140, duration: 800 }} class="outter">
  <div class="inner">
    <div class="everything">
      <div>
        <h1 class="title">Connect 4</h1>
        <div class="topper">
          <h2 class="back" on:click={leave}><i class="fas fa-arrow-left" /></h2>
          <h2 class="id">room: <b>{$game.room_id}</b></h2>
          <h2 class="back"><i class="fas fa-eye" /></h2>
        </div>
      </div>
      <div class="board">
        {#if $game.state !== "ongoing"}
          <div in:fly={{ y: 140, duration: 800 }} class="overlay">
            <h1>You Win</h1>
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
    position: absolute;
    z-index: 10;
    right: 25%;
    bottom: 55%;
    width: 50%;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 5px 10px 2px rgb(220, 220, 220);
    border-radius: 5px;
  }
</style>
