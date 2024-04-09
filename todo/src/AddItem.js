import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import './AddItem.css'
import apiRequest from './apiRequest'


const AddItem = ({task,setTask,setFetchError}) => {

    const [valueInBox,setValueInBox] = useState('')

    const inputRef = useRef() 

     const addNewToDo = async (work)=>{
         const id=task.length?task[task.length-1].id+1 :1
         const addNewItem = {id,work,checked:false}
         const newListItems = [...task,addNewItem]
         setTask(newListItems)
         console.log(newListItems)
        //  localStorage.setItem("updatedToDo",JSON.stringify(newListItems))
        const API_URL = 'http://localhost:3500/items';

        const postOptions = {
          method:'POST',
          headers: {
            'Content-Type':'application/JSON'
          },
          body: JSON.stringify(addNewItem)
        }

        const result = await apiRequest(API_URL, postOptions)
        }

    const handleSubmit = (e)=>{
        e.preventDefault()
        // if(!valueInBox){
        // document.getElementById('errorarea').innerHTML="This is required*"
        // } 
        console.log(valueInBox)
        addNewToDo(valueInBox)
        setValueInBox('')
  }


    
        //document.getElementsByClassName('errorarea').value="This"

  return ( 
    <form action="submit" className='TodoForm' onSubmit={(e)=>{handleSubmit(e)}}>
        <p id='errorarea'></p>
        <input 
        type="text"
        autoFocus
        ref={inputRef}
        name="" id="" className='todo-input' 
        placeholder='Add your task'
        value={valueInBox}
        onChange={(e)=>setValueInBox(e.target.value)}/>
        <button 
        className='todo-btn'
        onClick={()=>inputRef.current.focus()}
        >Add Task</button>
    </form>
  );
  }

export default AddItem;
