import React from 'react'
import './ContentWrapper.css'
import { FaTrashAlt } from "react-icons/fa";
import AddItem from './AddItem.js';
import {useState,useEffect} from 'react'

const ContentWrapper = ({task,setTask,isLoading,fetchItems,handleCheck,handleDelete}) => {




  return (
    <div className='Content_Wrapper'>

        {fetchItems && <p>{`Error:${fetchItems}`}</p>}
        {isLoading && <p>Loading list...</p>}

        {(task.length)?(
            <ul>
            {task.map((hi) => (
                <li key={hi.id}>
                    <div className='chk_lbl'>
                        <div className='chk'>
                            <input type="checkbox" className='checkbox'
                            onChange={()=>handleCheck(hi.id)}
                            checked={hi.checked}
                            />
                        </div>
                        <div className='lbl'>
                            <label style={(hi.checked)?{textDecoration:"line-through"}:null}>
                              {hi.work}  
                            </label>
                        </div>
                    </div>
                    <button 
                    className='dltbtn'
                    onClick={()=>handleDelete(hi.id)}>
                    <FaTrashAlt />
                    </button>
                </li>
            )
            )}
        </ul>
         ):!isLoading && !fetchItems && <p>Add Your today's work above</p>} 

    </div>
  )
}


export default ContentWrapper;
