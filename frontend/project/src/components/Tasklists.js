import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from './Updatetask';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTask,removeTaskFromList, getTasksFromServer, deleteTaskFromServer } from '../slices/TasksSlice';
import { useEffect } from 'react';

const Tasklists = () => {
  const {taskLists}=useSelector((state)=>state.tasks)
  const dispatch =useDispatch();
const updatetask=(task)=>{
  console.log("update task");
  setModalShow(true);
  dispatch(setSelectedTask(task))
}
useEffect(()=>{
  dispatch(getTasksFromServer())
},[dispatch])
const deletetask=(task)=>{
console.log("delete task");
dispatch(deleteTaskFromServer(task))
.unwrap()
.then(dispatch(removeTaskFromList(task)))

}

const [modalShow,setModalShow]=useState(false)



  return (
    <>
    
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          taskLists && taskLists.map((task,index)=>{
            return (<tr key={task._id}>
            <td>{index+1}</td>
            <td>{task.title}</td>
            <td >{task.description}</td>
            <td> <Button variant="primary" onClick={()=>updatetask(task)}><i className="bi bi-pencil-square"></i></Button> <Button variant="primary" onClick={()=>deletetask(task)}><i className="bi bi-trash3-fill"></i></Button></td>
          </tr>)
            
          })
        }
        
        </tbody>
        </Table>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}

export default Tasklists