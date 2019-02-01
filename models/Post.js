const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
    // Creating name and avatar separately so if an account is deleted, their posts are not. 
    firstName: {
        type: String,
    },
    avatar: {
        type: String
    },
    // If a user likes a post, their ID goes in the array. If they unlike it, it is removed.
    likes: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }
    ],
    date: {
        type: Date,
        default: Date.now
    },
    comments: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        text: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
        },
        avatar: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }

    }
    ]
});

module.exports = Post = mongoose.model('Post', PostSchema);