<script>
  import { fly } from "svelte/transition";
  import { game } from "./stores";
  import Cell from "./Cell.svelte";
</script>

<!-- html -->
<div transition:fly={{ y: 100, duration: 800 }} class="outter">
  <div class="inner">
    <div class="everything">
      <div>
        <h1 class="title">Connect 4</h1>
      </div>
      <div class="board">
        {#each Array(42) as _, i}
          <Cell emoji="😇" column={i % 7} />
        {/each}
      </div>
      <div class="footer">
        <div class="name">
          <p class="emoji">{$game.other.emoji}</p>
          <p>{$game.other.name}</p>
        </div>

        <div class="name">
          <p>{$game.self.name} (<b>you</b>)</p>
          <p class="emoji">{$game.self.emoji}</p>
        </div>
      </div>
    </div>
  </div>
</div>

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

  .board {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 50px);
    grid-template-rows: repeat(6, 50px);
  }

  .footer {
    display: flex;
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
</style>
