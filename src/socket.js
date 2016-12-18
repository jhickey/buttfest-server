import sio from 'socket.io';

class BFSocket {
    constructor() {
        this._io = null;
    }
    initialize(server) {
        this._io = sio(server);
        this._io.on('connection',  socket => {
            socket.emit('temperature', {temperature: global.temperature});
            console.log('Connection!');
        });
    }

    io() {
        return this._io;
    }

}
console.log('new instance');
const bfSocket = new BFSocket();
export default bfSocket;
