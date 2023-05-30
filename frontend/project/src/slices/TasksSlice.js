import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    taskLists:[],
    selectedTask:{},
    isLoading:false,
    error:''
}
const BASE_URL='http://localhost:7000/api/tasks';

// GET

export const getTasksFromServer=createAsyncThunk(
   "tasks/getTasksFromServer",
   async(_,{rejectWithValue})=>{
    const response=await fetch(BASE_URL);
   
    if(response.ok){
        const jsonresponse=await response.json(); 
        return jsonresponse;
    }
    else{
        return rejectWithValue({error:"No Task Found"})
    }
   }

)
//POST
export const addTaskToServer=createAsyncThunk(
    "tasks/addTaskToServer",
    async(task,{rejectWithValue})=>{
     const options={
        method:"POST",
        body:JSON.stringify(task),
        headers:{
            "Content-type":"application/json; charset=UTF-8"
        }

     }
     const response=await fetch(BASE_URL,options);
     if(response.ok){
         const jsonresponse=await response.json(); 
         return jsonresponse;
     }
     else{
         return rejectWithValue({error:"Task Not Added"})
     }
    }
)
//PATCH
export const updateTaskInServer=createAsyncThunk(
    "tasks/updateTaskInServer",
    async(task,{rejectWithValue})=>{
     const options={
        method:"PATCH",
        body:JSON.stringify(task),
        headers:{
            "Content-type":"application/json; charset=UTF-8"
        }

     }
     const response=await fetch(BASE_URL+'/'+task._id,options);
     if(response.ok){
         const jsonresponse=await response.json(); 
         return jsonresponse;
     }
     else{
         return rejectWithValue({error:"Task Not Updated"})
     }
    }
)

//DELETE

export const deleteTaskFromServer=createAsyncThunk(
    "tasks/deleteTaskFromServer",
    async(task,{rejectWithValue})=>{
     const options={
        method:"DELETE",
     }
     const response=await fetch(BASE_URL+'/'+task._id,options);
     if(response.ok){
         const jsonresponse=await response.json(); 
         return jsonresponse;
     }
     else{
         return rejectWithValue({error:"Task Not Deleted"})
     }
    }
)


const TasksSlice=createSlice({

    name:"TasksSlice",
    initialState,
    reducers:{
        addTaskToList:(state,action)=>{
             const id=Math.random()*100;
             let  task={...action.payload,id}; 
             state.taskLists.push(task);
        },
        removeTaskFromList:(state,action)=>{
            state.taskLists=state.taskLists.filter((task)=>task._id !== action.payload._id)

        },
        upadateTaskInList:(state,action)=>{
            state.taskLists=state.taskLists.map((task)=>task._id===action.payload._id ? action.payload :task)
        },
        setSelectedTask:(state,action)=>{
            state.selectedTask=action.payload;
        }

    },
    extraReducers:(builder)=>{
        builder
         .addCase(getTasksFromServer.pending,(state)=>{
             state.isLoading=true;
         })
         .addCase(getTasksFromServer.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.error='';
            state.taskLists=action.payload;
         })
         .addCase(getTasksFromServer.rejected,(state,action)=>{
            state.error=action.payload.error;
            state.isLoading=false;
            state.taskLists=[];
         })
         .addCase(addTaskToServer.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(addTaskToServer.fulfilled,(state,action)=>{
           state.isLoading=false;
           state.error='';
           state.taskLists.push(action.payload);
        })
        .addCase(addTaskToServer.rejected,(state,action)=>{
           state.error=action.payload.error;
           state.isLoading=false;
        })
        .addCase(updateTaskInServer.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(updateTaskInServer.fulfilled,(state,action)=>{
           state.isLoading=false;
           state.error='';
           state.taskLists=state.taskLists.map((task)=>task._id === action.payload._id ? action.payload : task)
        })
        .addCase(updateTaskInServer.rejected,(state,action)=>{
           state.error=action.payload.error;
           state.isLoading=false;
        })
        .addCase(deleteTaskFromServer.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(deleteTaskFromServer.fulfilled,(state)=>{
           state.isLoading=false;
           state.error='';
        })
        .addCase(deleteTaskFromServer.rejected,(state,action)=>{
           state.error=action.payload.error;
           state.isLoading=false;
        })
    }

})

export const {addTaskToList,  removeTaskFromList, upadateTaskInList,setSelectedTask}=TasksSlice.actions;
export default TasksSlice.reducer;

