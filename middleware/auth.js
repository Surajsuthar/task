import jwt from "jsonwebtoken"
import prisma from "../prisma/db.js"

const authMiddleware = async (req,res,next) => {
    try {
        const token = req.cookies?.token

        if(!token){
            return res.status(401).json({
                message:"unauthorized request"
            })
        }
        const decoded = await jwt.verify(token,process.env.JWT_SECERET)
        const {id,email} = decoded
        const user = await prisma.user.findUnique({
            where :{
                email
            }
        })
        if(!user){
            return res.status(401).json({
                message:"Invalid access token"
            })
        }
        req.user = user
        next()
    } catch (error) {
        console.log("authMiddleware",error)
    }
}

export default authMiddleware