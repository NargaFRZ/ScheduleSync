const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router.post('/create', groupController.createGroup);
router.post('/add-member', groupController.addMember);
router.post('/remove-member', groupController.removeMember);
router.post('/sync-schedules', groupController.syncSchedules);

module.exports = router;