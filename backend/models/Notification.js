const mongoose = require('mongoose');
const { Schema } = mongoose;

const notificationSchema = new Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: false
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: false
    },
    type: {
        type: String,
        enum: [
            'friend_request',
            'friend_acceptance',
            'group_invite_accepted',
            'group_invite_declined',
            'comment_on_post'
        ],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to automatically generate content based on type and user
notificationSchema.pre('save', function(next) {
    if (this.type === 'friend_request') {
        this.content = `Bạn có một lời mời kết bạn từ @${this.sender.username}.`;
    } else if (this.type === 'friend_acceptance') {
        this.content = `Giờ đây bạn và @${this.sender.username} đã là bạn bè.`;
    } else if (this.type === 'group_invite_accepted') {
        this.content = `Giờ đây bạn đã là thành viên của cộng đồng @${this.group.name}.`;
    } else if (this.type === 'group_invite_declined') {
        this.content = `Bạn đã bị từ chối gia nhập từ admin của @${this.group.name}.`;
    } else if (this.type === 'comment_on_post') {
        this.content = `@${this.sender.username} đã bình luận vào một bài viết gần đây của bạn.`;
    }
    next();
});

module.exports = mongoose.model('Notification', notificationSchema);