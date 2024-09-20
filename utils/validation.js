import {z} from "zod"

const userInput = z.object({
    email : z.string().email(),
    password : z.string().min(8,"Minimum 8 character")
})

export default userInput