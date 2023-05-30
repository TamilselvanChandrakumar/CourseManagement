import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {addTaskToServer } from '../slices/TasksSlice';
import { useDispatch } from 'react-redux';

const Addtasklist = () => {
  const dispatch=useDispatch()
    
    const [title,settitle]=useState(''); 
    const [description,setdescription]=useState('');
    const addtask=(e)=>{
        e.preventDefault();
        console.log({title,description});
        dispatch(addTaskToServer({title,description}))
        settitle('')
        setdescription("")
    }
  return (
    <>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label> Task Title</Form.Label>
        <Form.Control type="text" placeholder="Enter task title" value={title} onChange={(e)=>settitle(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Task Description</Form.Label>
        <Form.Control type="text" placeholder="Enter task Description" value={description} onChange={(e)=>setdescription(e.target.value)} />
      </Form.Group>
      <div className='text-end'>
      <Button variant="primary" type="submit" onClick={(e)=>addtask(e)}>
        AddTask
      </Button>
      </div>
      
    </Form>
    
    </>
  )
}

export default Addtasklist