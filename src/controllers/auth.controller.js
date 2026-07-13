const logger = require("../config/logger");
const { registerService, loginService } = require("../services/auth.service");


const register = async (req,res)=>{

    try {
       
        const response = await registerService(req.body);
     

        if(!response){
            logger.error({response},"unable to register ")
            return res.status(400).json({message:"Registration fialed"})
        }

        return res.status(201).json({success:true,data:response})
        
        
    } catch (error) {
        logger.error(error, "registration failed!")
        return res.status(500).json({
            sucess: false,
            message:error.message || "Internal Server Error"
        })
    }

   


    
}

const login = async (req, res) => {
    
    try {
        const response = await loginService(req.body);
        if (!response) {
            logger.error({ response }, "Invalid credials ")
            return res.status(401).json({message:"login failed !"})
        }
        logger.info({ email: req.body.email }, "login successfully done")
        return res.status(200).json({ success: true, data: response })

    } catch (error) {
        logger.error(error, "login failed!")
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }
}

module.exports = {
    register,
    login
};