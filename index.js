import express from "express"
import userRoute from "./routes/user.route.js"
import taskRoute from "./routes/task.route.js"
import cookieParser from "cookie-parser"
const app = express()
const PORT = 8080

app.use(express.json())
app.use(cookieParser())


app.use("/auth",userRoute)
app.use("/task",taskRoute)

app.use((err,re,res,next) => {
    if(err){
        throw new Error()
    }
    next()
})

app.listen(PORT,() => {
    console.log("server is on!")
})