const mongoose = require("mongoose");
const moment = require('moment');

// Creates new schema
const PostSchema = new mongoose.Schema(
    {
        _senderID:
        {
            type: mongoose.Schema.Types.ObjectId,
        },
        _recipientID:
        {
            type: mongoose.Schema.Types.ObjectId,
        },
        content:
        {
            type: String
        },
        timestamp:
        {
            type: Date,
            default: Date.now,
            get: (val) => {
                return moment(val).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }
)

module.exports = PostSchema; // Export PostSchema schema