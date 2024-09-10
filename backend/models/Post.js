const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema(
    {
        author: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        caption: { 
            type: String,
            max: 500,
            required: true
        },
        imgURL: {
            type: String,
            default: null
        },

        isPrivate: {
            type: Boolean,
            default: false
        },

        likes: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
        ],

        loves: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
        ],
        hates: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
        ],

        comment: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
        ],

        createdAt: { 
            type: Date, 
            default: Date.now 
        }
    }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
