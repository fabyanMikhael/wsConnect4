<script>
  import { fly } from "svelte/transition";
  import { game, started, Socket } from "./stores";
  import Cell from "./Cell.svelte";

  function leave() {
    // doesnt actually leave
    started.set(false);
  }
</script>

<!-- html -->
<div transition:fly={{ y: 140, duration: 800 }} class="outter">
  <div class="inner">
    <div class="everything">
      <div>
        <h1 class="title">Connect 4</h1>
        <div class="topper">
          <h2 class="back" on:click={leave}><i class="fas fa-arrow-left" /></h2>
          <h2 class="id">room: <b>{$game.room_id}</b></h2>
          <h2 class="back"><i class="fas fa-trophy" /></h2>
        </div>
      </div>
      <div class="board">
        {#each $game.board as row}
          {#each row as emoji, column}
            <Cell {emoji} {column} />
          {/each}
        {/each}
      </div>
      <div class="footer">
        <div class="name">
          <div class={`circle cc e${$game.other.emoji}`} />
          <!-- <p class="emoji">{$game.other.emoji}</p> -->
          <p>{$game.other.name || "invite a friend"}</p>
        </div>
        <div class="name">
          <p>{$game.self.name || ""} (<b>you</b>)</p>
          <div class={`circle cc e${$game.self.emoji}`} />
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
    margin: 2px;
  }

  .topper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2px;
  }

  .name {
    display: flex;
    justify-content: space-between;
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
  }
</style>
