const { projectSchema } = require('../middlewares/validate.middleware')
const {Project} = require('../models/project.model')

const createService = async (data) => {
    
    try {
        const { title, description } = req.body;
        
        const project = await Project.create({
            title,
            description,
            owner: req.user._id,
            members: [req.user._id],   // 👈 owner khud member
        });

    } catch (error) {
        
    }


}

module.exports = {createService}