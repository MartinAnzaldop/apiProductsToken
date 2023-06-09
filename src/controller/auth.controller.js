import User from '../models/user'
import  jwt  from 'jsonwebtoken';
import config from '../config'
import Role from '../models/roles'
import { token } from 'morgan';

export const signUp= async(req, res)=>{
    const {name,username, lastname, email, password, roles, telephone, birthdate}=req.body;

    const newUser= new User({
        name,
        username,
        lastname,
        email,
        telephone,
        birthdate,
        password: await User.encryptPassword(password),
    })

    if(roles){
        const foundRoles= await Role.find({name:{$in: roles}})
        newUser.roles=foundRoles.map(role=> role._id)
     }else{
         const role= await Role.findOne({name:"user"})
         newUser.roles=[role._id];
     }

    const savedUser= await newUser.save()
    console.log(savedUser)
    const token= jwt.sign({id:savedUser._id}, config.SECRET, {
    expiresIn: 86400 //5 hours
   })
   res.status(200).json({token})
}


export const signIn= async(req, res)=>{
   const userFound = await User.findOne({email: req.body.email}).populate("roles");
   if (!userFound) return res.status(400).json({ message: "User Not Found" });
   const matchPassword= await User.comparePassword(req.body.password, userFound.password)

   if(!matchPassword) return res.status(401).json({token:null, message: "Invalid password" });
   const token= jwt.sign({id:userFound._id}, config.SECRET,{
    expiresIn: 86400
   })
   console.log(userFound)
   res.json({token})
}  