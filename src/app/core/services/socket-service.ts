import {Injectable} from 'angular2/core';

import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
    socket: SocketIOClient.Socket;

    constructor() {
        this.socket = io.connect("localhost:3000");
    }
    public getSocket(): SocketIOClient.Socket {
        return this.socket;
    }
}