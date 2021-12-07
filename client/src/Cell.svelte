<script>
  export let emoji;
  export let highlight;
  export let column;

  function click() {
    if (!emoji) {
      // do stuff
    }
  }
</script>

<div
  on:click={click}
  class={`cell ${highlight ? "highlight" : "reg"}`}
  style={`curson: ${emoji ? "default" : "pointer"}`}
>
  {emoji}
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
