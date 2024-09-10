const Group = require('../models/Group');

exports.createGroup = async (req, res) => {
    try {
        const { groupName, description } = req.body;
        const existingGroup = await Group.findOne({ groupName });

        if (existingGroup) {
            return res.status(400).json({ message: 'Group name already exists.' });
        }

        const group = new Group({
            groupName,
            description,
            createdBy: req.user.id // Assuming the user ID is stored in req.user by authMiddleware
        });

        await group.save();
        res.status(201).json({ message: 'Group creation request is pending admin approval.', group });
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getPendingGroups = async (req, res) => {
    try {
        const pendingGroups = await Group.find({ status: 'pending' });
        res.status(200).json(pendingGroups);
    } catch (error) {
        console.error('Error fetching pending groups:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.acceptGroupRequest = async (req, res) => {
    try {
        const { groupId } = req.params;
        const group = await Group.findByIdAndUpdate(groupId, { status: 'approved' }, { new: true });
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        res.status(200).json({ message: 'Group request approved successfully.', group });
    } catch (error) {
        console.error('Error accepting group request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.declineGroupRequest = async (req, res) => {
    try {
        const { groupId } = req.params;
        const group = await Group.findByIdAndUpdate(groupId, { status: 'failed' }, { new: true });
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        res.status(200).json({ message: 'Group request declined successfully.', group });
    } catch (error) {
        console.error('Error declining group request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
