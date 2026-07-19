// import { validationResult } from 'express-validator';
import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import {sendEmail} from '../services/mail.service.js'
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

    await sendEmail({
        to:email,
        subject:"welcome to seekora!",
        text: `Hi ${username},\n\nThank you for registering at Seekora. We,re excited to have you on board! \n\nBest regards,\nThe Seekora Team`,
        html:`<p>Hi ${username},</p><p>Thank you for registering at <strong>Seekora</strong>.We,re excited to have you on board! <p>Best regards,<br>The <strong>Seekora</strong> Team</p>`
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