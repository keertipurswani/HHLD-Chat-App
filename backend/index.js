import express from "express"
import dotenv from "dotenv"
import http from "http"
import { Server } from "socket.io";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        allowedHeaders: ["*"],
        origin: "*"
      }
 });


io.on('connection', (socket) => {
    const username = socket.handshake.query.username;
    console.log('Username of connected client:', username);

    socket.on('chat msg', (msg) => {
        console.log(msg.sender);
        console.log(msg.receiver);
        console.log(msg.textMsg);
        console.log(msg);
        socket.broadcast.emit('chat msg', msg);
    });

})

app.get('/', (req, res) => {
  res.send('Congratulations HHLD Folks!');
});

server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

