const mongoose = require("mongoose");
const PostSchema = require("./post.model");

/**
 * If you create a new schema and try to reference
 * a model, you might run into duplicate key error.
 * To fix this issue, the referenced (in this case "user")
 * field should not have a unique index. To check this,
 * go to MongoDB and enter the command db["chats"].getIndexes(),
 * and look for an index in the reference field with "unique: true".
 * If you find one, drop it by entering db["chats"].dropIndex("_userID_1")
 * (the index name). Then, ensure there is no unique constraint in
 * reference field.
 */

// Creates new schema
const ChatSchema = new mongoose.Schema(
    {
        user:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        title:
        {
            type: String,
            required: [true, "This field is required"],
        },
        description:
        {
            type: String,
            required: [true, "This field is required"],
        },
        posts:
        {
            type: [PostSchema],
        },
    },
)

// Creates new model "Chat" for schema "ChatSchema"
const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat; // Export Chat model