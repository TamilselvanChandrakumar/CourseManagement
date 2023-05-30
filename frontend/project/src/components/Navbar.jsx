import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const {taskLists,error}=useSelector((state)=>state.tasks)
  return (
    <>
    <h1 className='text-center my-4 text-primary'>Project Management</h1>
    <p className='text-center lead'>{`Currently ${taskLists.length} task(s) pending`}</p>
    {
      (error !== '')?<h5 className='text-center  text-danger'>{error}</h5> :null
    }
    </>
  )
}

export default Navbar