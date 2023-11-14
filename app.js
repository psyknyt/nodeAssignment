const http = require("http");
const Routes = require("./Routes");

const server = http.createServer(Routes);

console.log(Routes);

server.listen(3000);
