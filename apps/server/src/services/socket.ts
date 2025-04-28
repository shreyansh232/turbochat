import {Server} from "socket.io";


class SocketService{
    private _io: Server;

    constructor(){
        console.log("Init Socket Service");
        this._io = new Server({
            cors:{
                allowedHeaders: ['*'],
                origin: "*"
            }
        });

    }

    public initListeners(){
        const io = this._io;
        console.log("Init socket listeners");
        io.on("connect", (socket) => {
            console.log("User connected", socket.id);
            socket.on("event:message", async ({message} : {message: string}) => {
                console.log("New message recieved", message);
            })
     
        })
    }
    get io(){
        return this._io;
    }


}

export default SocketService;