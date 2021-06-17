const server = require("./server");
const router = require("./router");
const requestHandlers = require("./requestHandlers");

// router mapping
let handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

// dependency injection: inject route, handle to server
server.start(router.route, handle);