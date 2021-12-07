<!-- script -->
<script >
	import { io } from "socket.io-client";

    const Socket = io("http://127.0.0.1:8080");
	Socket.on("connect", () => alert("connected!"));

</script>

<!-- html -->
<h1>Hello there.</h1>

<!-- styling -->
<style></style>