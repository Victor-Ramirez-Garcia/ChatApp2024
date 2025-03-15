const ChatController = require("../controller/chat.controller");

// Traffic all requests from the path to the given request handler
module.exports = app => {
    // Creates a new chat room
    app.post("/api/chats/create", ChatController.createChat);
    // Gets all chat rooms excluding ":user"
    app.get("/api/chats/all/exclude/:user", ChatController.getAllNonUserChats);
    // Gets all ":user" chat rooms
    app.get("/api/chats/:user", ChatController.getAllUserChats);
    // Get ":chat" chat room by id
    app.get("/api/chats/posts/:chat", ChatController.getChatPostsById);
    // Delete ":chat" chat room
    app.delete("/api/chats/delete/:chat", ChatController.deleteChatById);
}