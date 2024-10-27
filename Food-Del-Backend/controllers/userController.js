import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import  userModel  from "../models/userModel.js";
import 'dotenv/config.js'



//login user
const loginUser = async(req, res) =>{
    
    const {email, password} = req.body;

    try{
        const user = await userModel.findOne({email});
     if(!user){
        return res.json({success:false, message:"User don't exists"})
     }

     const isMatch = await bcrypt.compare(password, user.password);
     if(!isMatch){
        return res.json({success:false, message:"Invalid credentails"})
     }
      
     const token =createToken(user._id);
     res.json({success:true, token})
    }
    catch(err){
        res.json({success:false, message:err.message || "Error"})
    }
}

const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '7d' }); // Token valid for 7 days
}



//register user
const registerUser = async(req, res) =>{

    const {name, email, password} = req.body

    try{
    //check user already exists
    const exists = await userModel.findOne({email});
    if(exists){
        return(
            res.json({success:false, message:"User already exists"})
        )}

    // check valid email and password
    if(!validator.isEmail(email)){
        return(
            res.json({success:false, message:"Invalid email"})
        )
    }
    if(password.length<8){
        return(
            res.json({success:false, message:"Please enter strong password"})
        )
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    //create new user
    const newUser =new userModel({
        name:name,
        email:email,
        password:hashedPassword
    })
    const user = await newUser.save();
    const token = createToken(user._id);
    
    res.json({success:true})
 }
    catch(err){
     res.json({success:false, message:err.message || "Error"})
    }

}


export {loginUser, registerUser}