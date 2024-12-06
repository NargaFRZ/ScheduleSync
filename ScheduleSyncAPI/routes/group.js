const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router.post('/create', groupController.createGroup);
router.post('/add-member', groupController.addMember);
router.delete('/remove-member', groupController.removeMember);
router.post('/sync-schedules', groupController.syncSchedules);
router.delete('/delete', groupController.deleteGroup);
router.get('/get-members/:groupID', groupController.getGroupMembers);
router.post('/join', groupController.joinGroup);
router.get('/synced-schedule/:groupID', groupController.getSyncedSchedule);
router.get('/', groupController.getAllGroups);

module.exports = router;