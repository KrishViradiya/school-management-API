const express = require('express');
const router = express.Router();
const schoolController = require('../../controllers/schoolController');

// School routes
router.get('/listSchools', schoolController.listSchools);
router.post('/addSchool', schoolController.addSchool);

module.exports = router; 