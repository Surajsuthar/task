import jwt from "jsonwebtoken"

const createToken = (user) => {
    const {id,email} = user
    return jwt.sign({
        id,
        email
    },process.env.JWT_SECERET,{
        expiresIn : 100*60*60
    })
}

export {
    createToken
}