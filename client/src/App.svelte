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

  <!-- Primary Meta Tags -->
  <title>Connect 4 - Online</title>
  <meta name="title" content="Connect 4 - Online" />
  <meta
    name="description"
    content="Mime is a fast and reliable meme generation API."
  />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://ws-connect4.rcp.r9n.co" />
  <meta property="og:title" content="Connect 4 - Online" />
  <meta
    property="og:description"
    content="Easily play connect 4 with your friends."
  />
  <meta
    property="og:image"
    content="https://cdn.discordapp.com/attachments/829072008733261834/918290891154800680/unknown.png"
  />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://ws-connect4.rcp.r9n.co" />
  <meta property="twitter:title" content="Connect 4 - Online" />
  <meta
    property="twitter:description"
    content="Easily play connect 4 with your friends."
  />
  <meta
    property="twitter:image"
    content="https://cdn.discordapp.com/attachments/829072008733261834/918290891154800680/unknown.png"
  />
  <meta name="theme-color" content="#333" />
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
