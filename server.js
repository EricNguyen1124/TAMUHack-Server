const express = require("express");
const server = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const portNumber = process.env.PORT || 5000;

server.use(cors());
server.use(express.static("public"));

server.use(express.json());
server.use;
server.use(require("./routes/customer"));
server.use(require("./routes/task"));
server.use(require("./routes/files"));
server.use("/documents", require("./routes/ai"));
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  

});
const databaseConnection = require("./connection");

server.listen(portNumber, () => {
  databaseConnection.connectToServer(function (e) {
    if (e) console.error(e);
  });
  console.log(`Server is running on port: ${portNumber}`);
});
