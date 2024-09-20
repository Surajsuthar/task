import express from "express"
import {
    createTask,
    updateTask,
    deleteTask,
    getAlltask,
    getSingleTask
} from "../controller/task.controller.js"
import authMiddleware from "../middleware/auth.js"

const route = express.Router()

route.post("/",authMiddleware,createTask)
route.get("/:id",authMiddleware,getSingleTask)
route.get("/",authMiddleware,getAlltask)
route.put("/:id",authMiddleware,updateTask)
route.delete("/:id",authMiddleware,deleteTask)

export default route