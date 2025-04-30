import { Server } from "socket.io";
import Valkey from "ioredis";
import dotenv from 'dotenv';
dotenv.config();


const serverURI = process.env.SERVERURI;
if (!serverURI) {
  throw new Error("Not found server URI");
}
const pub = new Valkey(serverURI);
const sub = new Valkey(serverURI);

class SocketService {
  private _io: Server;

  constructor() {
    console.log("Init Socket Service");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    sub.subscribe("MESSAGES");
  }

  public initListeners() {
    const io = this._io;
    console.log("Init socket listeners");
    io.on("connect", (socket) => {
      console.log("User connected", socket.id);
      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("New message recieved", message);
        //publish this message to Redis/Valkey
        await pub.publish("MESSAGES", JSON.stringify({ message }));
      });
    });
    sub.on("message", (channel, message) => {
      if (channel === "MESSAGES") {
        io.emit("message", message);
      }
    });
  }
  get io() {
    return this._io;
  }
}

export default SocketService;

