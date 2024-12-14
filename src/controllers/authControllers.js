import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerController = async(req,res) => {
    try{
        const {username,password,role} = req.body 
        if(!username || !username || !password){
            return res.status(400).send({
                success:false,
                message:'Please Fill all fields'
            })
        }   

        //Existing User
        const existingUser = await userModel.findOne({username})
        if(existingUser){
            return res.status(401).send({
                success: false,
                message:'user already exisits'
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)

        //Save new User
        const user = new userModel({username, password:hashedPassword, role})
        await user.save()
        return res.status(201).send({
            success:true,
            message:'New User Created',

        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            message:'Error In Register Callback',
            success:false,
            error
        })
        
    }
};

export const loginController = async(req,res) => {
    try {
        const {username, password} = req.body;
        if(!username || !password){
            return res.status(401).send({
                success:false,
                message:'Please provide username or password'
            })
        }

        const user = await userModel.findOne({username})
        if(!user){
            return res.status(500).send({
                success:false,
                message:'Error In Login Callback',
                error
            })
        }
        //Password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).send({
                success:false,
                message:'Invalid Credentials'
            })
        }
        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn:"1h"});
        return res.status(200).send({
            token,
            success:true,
            message:'login successful',
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error In Login Callback',
            error
        })
        
    }
};

export const getAllUsers = async(req,res) => {
    try{
        const users = await userModel.find({})
        return res.status(200).send({
            userCount: users.length,
            success:true,
            message:"all users data",
            users,
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error In Get All Users',
            error
        })
        
    }
};
