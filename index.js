const express = require('express');
const { createServer } = require('node:https');
const { join } = require('node:path');
const { Server } = require('socket.io');
const { readFileSync } = require('fs')
const app = express();

var privateKey = readFileSync( 'key.pem' );
var certificate = readFileSync( 'cert.pem' );

const server = createServer({
    key: privateKey,
    cert: certificate
},app);
const io = new Server(server);

app.get('/', (req, res) => {
    console.log('hello!')
    res.sendFile(join(__dirname), 'vue-ui/dist/index.html');
    //res.sendFile(join(__dirname, 'index.html'));
});

app.get('/api', (req, res)=>{
    res.set('Permissions-Policy', 'midi=[*];')
    res.send(join(__dirname, 'index.html'))
})

app.use('/', express.static('vue-ui/dist'))

io.on('connection', (socket) => {
    console.log(`a user connected`);

    socket.on('chat', (data)=>{

        let merged = {
            //merge the object that came from the client with some data we compute on the server. server is record of truth!


            ...data, // Raw data from client
            user: socket.id, // user can change their alias locally but the server will always know a user by their socket id. socket id changes on reconnect, but you could track by IP or store a cookie or smth
            chat_id: Math.floor(Math.random() * (456789656789 - 0)), // id of a message, keep messages unique
            time: Date.now() //epoch time from server
        }

        io.emit('chat', merged)
    })


});

server.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
});