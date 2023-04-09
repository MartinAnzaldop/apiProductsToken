import {Schema, model} from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema=new Schema({
    name: String,
    username:{
        type:String,
        unique:true
    },
    lastname:String,
    email:{
        type:String,
    unique:true
    },
    password: {
        type:String,
        required:true
    },
    roles: [{
        type: Schema.Types.ObjectId,
        ref: "Role"
      }],
    telephone:String,
    birthdate:String
},{
    timestamps:true,
    versionKey:false
})

userSchema.statics.encryptPassword=async(password)=>{
const salt= await bcrypt.genSalt(10)
return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword=async(password, receivePassword)=>{
  return  await bcrypt.compare(password, receivePassword)
}

export default model('User', userSchema);