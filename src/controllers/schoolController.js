const schoolService = require('../services/schoolService');

class SchoolController {
  async addSchool(req, res) {
    try {
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
