const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

router.post('/upload', scheduleController.uploadSchedule);
router.put('/update', scheduleController.updateSchedule);
router.delete('/delete', scheduleController.deleteSchedule);
router.get('/schedulesByOwner', scheduleController.getSchedulesByOwner);
router.get('/schedulesById/:scheduleid',scheduleController.getSchedulesById);

module.exports = router;