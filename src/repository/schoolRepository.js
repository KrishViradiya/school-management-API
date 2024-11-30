const School = require('../models/school.model');

class SchoolRepository {
    async create(schoolData) {
        return await School.create(schoolData);
    }

    async findAll() {
        return await School.findAll();
    }
}

module.exports = new SchoolRepository(); 