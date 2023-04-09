import {ROLES}  from '../models/roles'
import User from '../models/user'

export const checkDuplicateUserOrEmail=async( req, res, next)=>{
    const userFound = await User.findOne({ username: req.body.username });
    if(userFound) return res.status(400).json({mesaage:"The username alredy exits"})

    const email= await User.findOne({email:req.body.email})
    if(email) return res.status(400).json({mesaage:"The email alredy exits"})
    next()
}

export const checkRolesExited=(req, res, next)=>{
    if(req.body.roles){
        for(let i=0; i< req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                return res.status(400).json({
                    message:`Role ${req.body.roles[i]} does not exits`
                })
            }
        }
    }
    next();
}