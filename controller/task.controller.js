import prisma from "../prisma/db.js"

const createTask = async (req,res) => {
    const { title, description, status, priority,userId } = req.body;
    await prisma.task.create({
        data: { 
            title, 
            description, 
            status, 
            priority, 
            userId: req.user.id 
        },
    });
    res.status(201).json({
        messsage : "task created"
    });
}

const updateTask = async (req,res) => {
    const task = await prisma.task.findUnique({ 
        where: { 
            id: Number(req.params.id) 
        } 
    });
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    const updatedTask = await prisma.task.update({
        where: { id: Number(req.params.id) },
        data: req.body,
    });
    res.status(200).json(updatedTask);
}

const deleteTask = async (req,res) => {
    const task = await prisma.task.findUnique({ 
        where: { 
            id: Number(req.params.id) 
        } 
    });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
  
    await prisma.task.delete({ where: { id: Number(req.params.id) } });
    res.status(201).json({
        message : "task deleted succesfully"
    });
}

const getAlltask = async (req,res) => {
    const tasks = await prisma.task.findMany({ 
        where: { userId: req.user.id } 
    });
    res.status(200).json(tasks);
}

const getSingleTask = async (req,res) => {
    const tasks = await prisma.task.findUnique({ 
        where: { 
            id : Number(req.params.id)
        } 
    });
    if(!tasks){
        return res.status(404).json({ 
            message: 'Task not found' 
        });
    }
    res.status(200).json(tasks);
}

export {
    createTask,
    updateTask,
    deleteTask,
    getAlltask,
    getSingleTask
}