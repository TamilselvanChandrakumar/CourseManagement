const taskmodel=require('../models/taskmodel');
const mongoose=require("mongoose");
//To create a task-POST

const createtask=async (req,res)=>{
    const{title,description}=req.body;
    try {
        const task=await taskmodel.create({title,description});
        res.status(200).json(task)
    } catch (e) {
        res.status(400).json({error:e.message})
    }
}
//To get all tasks -get method
const gettasks= async (req,res)=>{
    try {
        const tasks=await taskmodel.find({});
        res.status(200).json(tasks);
        
    } catch (e) {
        res.status(400).json({error:e.message});
    }
}
//To get all tasks-get method
const getsingletask=async (req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:"task not found"})
    }
    try {
        const singletasks=await taskmodel.findById(id);
        res.status(200).json(singletasks);

    } catch (e) {
        res.status(400).json({error:e.message})
    }
}

//update a task-PATCH
const updatetask=async (req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:"task not found"})
    }
    try {
        const task=await taskmodel.findByIdAndUpdate(
            {_id:id},
            {...req.body}
        );
        res.status(200).json(task)
    } catch (e) {
        res.json(400).json({error:e.message })
    }
}
//delete a task-DELETE
const deletetask=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:"task not found"})
    }
    try {
        const task=await taskmodel.findByIdAndDelete(id);
        res.status(200).json({message:"deleted successful"})
    } catch (e) {
        res.status(400).json({error:e.message});
    }
}
module.exports={createtask,gettasks,getsingletask,updatetask,deletetask};  