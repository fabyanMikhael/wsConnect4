<!-- script -->
<script>
  import Board from "./Board.svelte";
  import Info from "./Info.svelte";
  import { started, game, player_count, Socket } from "./stores";
  import { WS_Client } from "../../wsEnums";

  $Socket.on(WS_Client.PlayerCount, (count) => player_count.set(count));
  $Socket.on(WS_Client.GameState, (gs) => {
    // console.log(gs);
    game.set(gs);
    started.set(true);
  });
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
  />
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.8/clipboard.min.js"></script>
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
