const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupSchema = new Schema({
    groupName: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'failed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
