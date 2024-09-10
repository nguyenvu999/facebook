const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true 
        },

        email: { 
            type: String, 
            required: true, 
            unique: true 
        },

        password: { 
            type: String, 
            required: true 
        },

        role: { 
            type: String, 
            enum: ['user', 'admin'], 
            default: 'user' 
        },

        friendList: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'User' 
            }
        ],

        pendingFriends: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'User' 
            }
        ],
        
        isSuspended: { 
            type: Boolean, 
            default: false 
        },

        imageUrl: { 
            type: String,
            default: '/assets/icon/profile-placeholder.svg'
        }
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;