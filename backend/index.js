import express from "express"
import dotenv from "dotenv"
import http from "http"
import { Server } from "socket.io";
import cors from "cors";
import msgsRouter from "./routes/msgs.route.js"
import connectToMongoDB from "./db/connectTOMongoDB.js";
import { addMsgToConversation } from "./controllers/msgs.controller.js";


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

const userSocketMap = {};

io.on('connection', (socket) => {
    const username = socket.handshake.query.username;
    console.log('Username of connected client:', username);

    userSocketMap[username] = socket;

    socket.on('chat msg', (msg) => {
        console.log(msg.sender);
        console.log(msg.receiver);
        console.log(msg.text);
        console.log(msg);
        const receiverSocket = userSocketMap[msg.receiver];
        if(receiverSocket) {
          receiverSocket.emit('chat msg', msg);
        }
        addMsgToConversation([msg.sender, msg.receiver], {
                  text: msg.text,
                  sender:msg.sender,
                  receiver:msg.receiver
                }
        )
    });

})

app.use('/msgs', msgsRouter);

app.get('/', (req, res) => {
  res.send('Congratulations HHLD Folks!');
});

server.listen(port, () => {
  connectToMongoDB();
  console.log(`Server is listening at http://localhost:${port}`);
});

