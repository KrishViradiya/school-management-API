const express = require('express');
const router = express.Router();
const v1Routes = require('./v1');

// Mount v1 routes
router.use('/v1', v1Routes);

// For backward compatibility (if needed)
router.use('/', v1Routes);  // This will allow both /api/listSchools and /api/v1/listSchools

module.exports = router;