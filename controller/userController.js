import userModel from "../models/userModel";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

import dotenv from 'dotenv'
dotenv.config()

//USer Register route
export const register = async (req,res) => {
    const {username, email,password} = req.body;

    try {
        const existingUSer = await userModel.findOne({email})
        if(existingUSer){
            return res.status(400).json({message:'User already exist'})
        }else {

            
        }
        
    } catch (error) {
        console.log('Error creating user',error);
        res.status(500).json({message:'Server error'})
        
    }
}
