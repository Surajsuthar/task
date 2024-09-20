import userInput from "../utils/validation.js"
import bcrypt from "bcrypt"
import prisma from "../prisma/db.js"
import { createToken } from "../utils/service.js"

const register = async (req, res) => {
    try {
        const {success} = userInput.safeParse(req.body)
        if(!success){
            res.status(401).json({
                message:"Enter valid Inputs"
            })
        }
        const { email, password ,role} = req.body
        const hashPassword = await bcrypt.hash(password,10)
        const user = await prisma.User.create({
            data : {
                email,
                password:hashPassword,
                role
            }
        })

        return res.status(201).json({
            user,
            message:"User registered successfully"
        })
    } catch (error) {
        console.log(error)
    }
}

const login = async (req,res) => {
    try {
        const {success} = userInput.safeParse(req.body)
        if(!success){
            return res.status(401).json({
                message:"Enter valid Inputs"
            })
        }
        const { email, password} = req.body;
        const user = await prisma.User.findUnique({
            where:{
                email
            }
        })
        console.log(user)
        const matchPassword = await bcrypt.compare(password,user.password)
        if(!matchPassword){
            return res.status(401).json({
                message : "Password is Incorrect"
            })
        }
        
        const options = {
            httpOnly : true,
        }
        const token = createToken(user)
        res.cookie("token",token,options)
        res.status(201).json({
            message:"User successfully login"
        })
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export {
    login,
    register
}