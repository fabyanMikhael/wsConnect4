<!-- script -->
<script>
  import Board from "./Board.svelte";
  import Info from "./Info.svelte";
  import { started, game, Socket } from "./stores";
  import { WS_Client } from "../../wsEnums";

  $Socket.on(WS_Client.GameState, (gs) => {
    console.log(gs);
    started.set(true);
    game.set(gs);
  });
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
  />
</svelte:head>

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
