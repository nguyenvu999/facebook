const express = require('express');
const {
    createGroup,
    getPendingGroups,
    acceptGroupRequest,
    declineGroupRequest
} = require('../controllers/groupController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, createGroup);
router.get('/pending', authMiddleware, adminMiddleware, getPendingGroups);
router.put('/:groupId/accept', authMiddleware, adminMiddleware, acceptGroupRequest);
router.put('/:groupId/decline', authMiddleware, adminMiddleware, declineGroupRequest);

module.exports = router;
