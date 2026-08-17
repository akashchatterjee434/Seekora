// import { validationResult } from 'express-validator';
import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import {sendEmail} from '../services/mail.service.js'

// this part is used for sending a verification mail!!
export async function register(req, res){

    const {username, email , password} = req.body;
    
    const isUserAlreadyExist = await userModel.findOne({
        $or:[{email},{username}]
    }) 

    if(isUserAlreadyExist){
        return res.status(400).json({
            message:"user with this email or username is already exists",
            success:false,
            err:"user already exists"
        })
    }


      
    const user = await userModel.create({username, email, password})

    const emailVerificationToken = jwt.sign({
        email:user.email,

    },process.env.JWT_SECRET)
    
    await sendEmail({
        to:email,
        subject:"welcome to seekora!",
        text: `Hi ${username},\n\nThank you for registering at Seekora. We,re excited to have you on board! \n\nBest regards,\nThe Seekora Team`,
        html:`<p>Hi ${username},</p><p>Thank you for registering at <strong>Seekora</strong>.We,re excited to have you on board!<P>Please verify your email by clicking the link below:</P><a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a><p>Best regards,<br>The <strong>Seekora</strong> Team</p>`
    })

    res.status(201).json({
        message:"user registered successfully",
        success:true,
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })


     
}

export async function verifyEmail(req, res) {
    const {token} = req.query;
    try{
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
   
    const user = await userModel.findOne({ email:decoded.email});

    if(!user){
        return res.status(400).json({
            message:"invalid Token",
            success:false,
            err:"user not found"
        })
    }
    user.verified = true;
    await user.save(); 
    const HTML = (`
        <h1>Email verified successfully</h1>
        <p>Your email has been verified. You can now login ton your account. </p>
        <a href = "http://localhost:3000/login">Go to Login</a>
        
        `)

      return res.send(HTML)

         }catch(err){
        return res.status(400).json({
            message:'Invalid or Expired token',
            success: false,
            err: err.message
        })
    }
}

export async function login(req, res){

    const{email, password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message:"invalid email or password",
            success:false,
            err: "user not found"
        })
    }

    const isPasswordMatch = await user.comparePassword(password);
    if(!isPasswordMatch){
        return res.status(400).json({
            message:"Invalid email or password",
            success: false,
            err:"incorrect password"
        })
    }

    if(!user.verified){
        return res.status(400).json({
            message:"Please verify your email before logging in",
            success: false,
            err:"Email not verified"
        })
    }

    const token = jwt.sign({
        id:user._id,
        username: user.username,
       
    },process.env.JWT_SECRET, {expiresIn: '7d'})

    res.cookie("token", token)

    res.status(200).json({
        message:"Login Successfully",
        success:true,
        user:{
            id:user._id,
            username: user.username,
            email:user.email
        }
    })
}

