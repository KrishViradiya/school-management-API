const schoolService = require('../services/schoolService.js');
const { testConnection } = require('../config/dbConfig.js');
class SchoolController {
  async addSchool(req, res) {
    try {
      const isConnected = await testConnection();
      if (!isConnected) {
        return res.status(500).json({ error: "Database connection failed" });
      }
      const schoolData = req.body;
      const school = await schoolService.addSchool(schoolData);
      res.status(201).json(school);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async listSchools(req, res) {
    try {
      const { latitude, longitude } = req.query;

      if (!latitude || !longitude) {
        return res.status(400).json({
          error: "Latitude and longitude are required",
        });
      }

      const schools = await schoolService.listSchools(
        parseFloat(latitude),
        parseFloat(longitude)
      );

      res.json(schools);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new SchoolController();
