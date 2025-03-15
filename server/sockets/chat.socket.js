const Chat = require("../model/chat.model");
const moment = require('moment');

module.exports = (server) => {
    const socketIO = require('socket.io');
    const io = socketIO(server, {
        cors: {
            origin: 'http://localhost:3000', // Allows requests to frontend
            methods: ['GET', 'POST'],
        },
    });

    // Listens for incoming sockets (users)
    io.on('connection', (socket) => {
        console.log("New client connected");

        // Handle incoming chat messages
        socket.on('sendMessage', async(formInfo) => {
            // Find Chat
            const chat = await Chat.findOne({_id: formInfo.chat});

            // Create new post to chat
            const post = {
                _senderID: formInfo.sender,
                _recipientID: formInfo.recipient,
                content: formInfo.content,
                timestamp: Date.now(),
            };

            chat.posts.push(post);
            await chat.save();
                
            post.timestamp = moment(post.timestamp).format('YYYY-MM-DD HH:mm:ss');

            // Broadcast message to 'receiveMessage' event
            io.emit('receiveMessage', { post: post });
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log("Client disconnected");
        });
    });
}