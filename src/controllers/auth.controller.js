const logger = require("../config/logger");
const registerService = require("../services/auth.service");


const register = async (req,res)=>{

    try {
       
        const response = await registerService(req.body);
        console.log( " sss",response)

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

module.exports = register