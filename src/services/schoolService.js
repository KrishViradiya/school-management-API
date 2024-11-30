const schoolRepository = require('../repository/schoolRepository.js');
const { calculateDistance } = require('../utils/distanceCalculator.js');

class SchoolService {
    async addSchool(schoolData) {
        this.validateSchoolData(schoolData);
        return await schoolRepository.create(schoolData);
    }

    async listSchools(userLat, userLong) {
        const schools = await schoolRepository.findAll();
        
        const schoolsWithDistance = schools.map(school => ({
            ...school.toJSON(),
            distance: calculateDistance(
                userLat, 
                userLong, 
                school.latitude, 
                school.longitude
            )
        }));

    
        return schoolsWithDistance.sort((a, b) => a.distance - b.distance);
    }

    validateSchoolData(data) {
        const { name, address, latitude, longitude } = data;
        
        if (!name || typeof name !== 'string') {
            throw new Error('Invalid school name');
        }
        if (!address || typeof address !== 'string') {
            throw new Error('Invalid address');
        }
        if (!latitude || isNaN(latitude) || latitude < -90 || latitude > 90) {
            throw new Error('Invalid latitude');
        }
        if (!longitude || isNaN(longitude) || longitude < -180 || longitude > 180) {
            throw new Error('Invalid longitude');
        }
    }
}

module.exports = new SchoolService(); 