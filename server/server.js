const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
 
app.use(express.static(publicPath));

io.on('connection', (socket) =>{
	console.log('new user connected');

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat App'));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User connected'));


	socket.on('createMessage', (message,callback)=>{
		console.log('createMessage', message);
		// socket.emit, emits message to singleuser but
		// io.emit, emits message to all connected users
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback();
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });
	});

	socket.on('createLocationMessage', (coords)=>{
		io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude,coords.longitude));
	});
	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});
});



server.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});