import { userModel } from "../../db/models/user.js";
import bcrypt from 'bcryptjs'


export const checkEmail =async (req, res, next) =>{
    try{
        if(!req.body.email) return res.status(400).json({message:"Email is required"})
         let foundedUser = await userModel.findOne({email: req.body.email})
         if (foundedUser) return res.status(409).json({message:"Already exist, please login"})
            if(!req.body.password) return res.status(400).json({message:"Password is required"})
            req.body.password = bcrypt.hashSync(req.body.password, 12);
            req.body.role = "user"
        next()
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}
