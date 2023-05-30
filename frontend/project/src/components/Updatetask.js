import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskInServer } from '../slices/TasksSlice';
// import { setSelectedTask } from '../slices/TasksSlice';

const MyVerticallyCenteredModal= (props) => {
    
    const {selectedTask}=useSelector((state)=>state.tasks)
    const [title,settitle]=useState('');
    const [id,setid]=useState(0);
    const [description,setdescription]=useState('');
    const dispatch=useDispatch();
    const updatetask=()=>{
      props.onHide();
      dispatch(updateTaskInServer({_id:id,title,description}))
  }
    useEffect(()=>{
      if(Object.keys(selectedTask).length !==0){
      settitle(selectedTask.title);
      setdescription(selectedTask.description)
      setid(selectedTask._id)
    } 
    },[selectedTask])
  return (
    <>
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Updatetask
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label> Task Title</Form.Label>
        <Form.Control type="text" placeholder="Enter task title" value={title} onChange={(e)=>settitle(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Task Description</Form.Label>
        <Form.Control type="text" placeholder="Enter task Description" value={description} onChange={(e)=>setdescription(e.target.value)} />
      </Form.Group>
      
      
    </Form>
      </Modal.Body>
      <Modal.Footer>

        <div className='text-end'>
      <Button variant="primary" type="submit" onClick={(e)=>updatetask(e)}>
        UpdateTask
      </Button>
      </div>
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default MyVerticallyCenteredModal