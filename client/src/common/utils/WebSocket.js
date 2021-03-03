import common from '../index.js';
export default function () {
    let socketURL = "ws://"+location.host+"/socket.mrx"
    window.socket = new WebSocket(socketURL);

    window.socket.onopen = (eventArgs) => {
        console.log(eventArgs);
    }

    window.socket.onclose = (eventArgs) => {
        setTimeout(function() {
            common.utils.WebSocket();
        },1000)
    }

    window.socket.onerror = (eventArgs)=> {
        console.log(eventArgs);
    };

    window.socket.onmessage = (eventArgs)=> {

        var event = JSON.parse(eventArgs.data);
        
        common.store.setProperty(event.type, event.params);
        // common.utils.EventHandler.emit(params.uuid, params.data);
    };
};
