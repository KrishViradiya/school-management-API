// const express = require("express");
// const v1Routes = require("./v1/index");

// const router = express.Router();

// router.use("/v1", v1Routes);

// module.exports = router;

const router = require('express').Router();

// Example route
router.get('/test', async (req, res) => {
  try {
    // req.db is now available from the middleware
    const result = await req.db.query('SELECT 1+1 as result');
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Route error:', error);
    res.status(500).json({ error: 'Route execution failed' });
  }
});

module.exports = router;