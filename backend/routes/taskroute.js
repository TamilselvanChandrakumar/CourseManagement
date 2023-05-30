const express=require('express');
const router=express.Router();
const {createtask,gettasks,getsingletask,updatetask,deletetask}=require('../controllers/taskcontrollerl');
router.post("/",createtask);
router.get('/',gettasks);
router.get("/:id",getsingletask)
router.patch("/:id",updatetask)
router.delete('/:id',deletetask)
module.exports=router;
