const Chat = require("../model/chat.model");
const User = require("../model/user.model");
const moment = require('moment');

// Export "createChat" function that creates
// a new chat document and stores it in "chats"
module.exports.createChat = (req, res) => {
    try {
        Chat.create(req.body)
        .then((chat) => {
            res.status(201).json({msg: "Chat Room Created", chat: chat}); // Created
        })
        .catch(err =>
        {
            res.status(400).json(err); // Bad Request
        })
    } catch(err) {
        res.status(500).json(err); // Internal Server Error
    }
}

// Gets all chats (excluding user), that is,
// req.body = {user: {$ne: user}}, where $ne = not equal
module.exports.getAllNonUserChats = (req, res) => {
    try {
        Chat.find({user: {$ne: req.params.user}})
        .then((chats) => {
            res.status(200).json({msg: "Chats Retrieved", chats: chats}); // OK
        })
    } catch(err) {
        res.status(500).json(err); // Internal Sever Error
    }
}

// Gets all chats only from the current user
module.exports.getAllUserChats = (req, res) => {
    try {
        Chat.find({user: req.params.user})
        .then((chats) => {
            res.status(200).json({msg: "Chats Retrieved", chats: chats}); // OK
        })
    } catch (err) {
        res.status(500).json(res); // Internal Server Error
    }
}

// Get the chat room posts by id
module.exports.getChatPostsById = (req, res) => {
    try {
        Chat.find({_id: req.params.chat})
        .then((chat_res) => {
            const posts = chat_res[0].posts;
            res.status(200).json({msg: "Chat Retrieved", posts: posts}); // OK
        })
    } catch (err) {
        res.status(500).json(res); // Internal Server Error
    }
}

// Deletes chat room by chat id
module.exports.deleteChatById = (req, res) => {
    try {
        Chat.deleteOne({_id: req.params.chat})
        .then((chat) => {
            res.status(200).json({msg: "Chat Deleted", chat: chat}); // OK
        })
        .catch((err) => {
            res.status(400).json(err); // Bad Request
        })
    } catch (err) {
        res.status(500).json(res); // Internal Server Error
    }
}