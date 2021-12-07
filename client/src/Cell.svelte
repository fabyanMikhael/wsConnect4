<script>
  import { fly } from "svelte/transition";
  import { Socket } from "./stores";
  import { WS_Server } from "../../wsEnums";

  export let emoji;
  export let highlight;
  export let column;

  function click() {
    if (emoji == 0) {
      $Socket.emit(WS_Server.TryMove, column);
    }
  }
</script>

<div
  on:click={click}
  class={`cell ${highlight ? "highlight" : "reg"}`}
  style={`cursor: ${emoji.length == 0 ? "pointer" : "default"}`}
>
  {#if emoji}
    <div
      transition:fly={{ y: -140, duration: 800 }}
      class={`circle e${emoji}`}
    />
  {/if}
</div>

<style>
  .cell {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: white;
    border-radius: 5px;
    margin: 2px;
    font-size: 2rem;
    transition: all 100ms;
    user-select: none;
  }

  .cell:hover {
    background-color: rgb(205, 205, 205);
  }

  .cell:active {
    background-color: rgb(185, 185, 185);
  }

  .reg {
    box-shadow: 0px 0px 10px 2px rgb(220, 220, 220);
  }

  .highlight {
    box-shadow: 0px 0px 10px 2px rgb(255, 221, 142);
  }
</style>
