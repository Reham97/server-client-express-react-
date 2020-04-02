//npm start
const cors = require('cors');
const express = require('express');
const app = express();
const socketio = require('socket.io');
const server = require('http').Server(app);

app.use(cors());
 
const io = socketio(server);

io.on('connection', (client) =>{ 
    //console.log(client);
    client.on('message', (message) => {
        console.log(message);
        io.emit('new-message',message);
    });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
