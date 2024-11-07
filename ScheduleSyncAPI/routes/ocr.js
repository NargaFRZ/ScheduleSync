const express = require('express');
const router = express.Router();
const ocrController = require('../controllers/ocrController');

router.post('/process', ocrController.processOCR);
router.get('/:scheduleID', ocrController.getOCRByScheduleID);

module.exports = router;
