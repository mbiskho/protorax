const Server = require("./server")
const port = process.env.PORT || 8000;
const server = new Server();
server.run(process.env.PORT || 8000);