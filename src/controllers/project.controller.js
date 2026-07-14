
const {createService} = require('../services/project.service')

const createProject = async (req, res, next) => {
    

    const response = createService(req.body)
}