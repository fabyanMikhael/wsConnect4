<!-- script -->
<script>
  import Board from "./Board.svelte";
  import Info from "./Info.svelte";
  import { started } from "./stores";
</script>

<!-- html -->
<body>
  {#if !$started}
    <Info />
  {:else}
    <Board />
  {/if}
</body>

<!-- styling -->
<style>
  body {
    overflow: hidden;
  }
</style>
