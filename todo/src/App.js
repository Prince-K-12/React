import React from 'react';
import Header from './Header';
import './App.css';
import './AddItem.css'
import AddItem from './AddItem';
import ContentWrapper from './ContentWrapper';
import {useEffect,useState} from 'react';
import apiRequest from './apiRequest';


function App() {

 
  
  const [task,setTask] = useState([])
  //         [
  //             {
  //                 id:1,
  //                 work:"simply sitting",
  //                 checked: false
  //             },
  //             {
  //                 id:2,
  //                 work:"sleeping",
  //                 checked: true
  //             }
  
  //         ]
  
  // )

  const API_URL = 'http://localhost:3500/items';
  
          //doubt
          const handleCheck = async(hello)=>{
              const updateCheckBox = task.map((hai)=>
              hai.id===hello ? {...hai, checked:!hai.checked}:hai)
              setTask(updateCheckBox);
             // localStorage.setItem("updatedToDo",JSON.stringify(updateCheckBox))

             const updateCheckBoxIn_API = updateCheckBox.filter((hi)=>hi.id===hello)
             const updateOptions = {
                method:'PATCH',
                headers:{
                    'Content-Type':'application/JSON'
                },
                body:JSON.stringify({checked:updateCheckBoxIn_API[0].checked})
             }
             const reqURL = `${API_URL}/${hello}`
             const result = await apiRequest(reqURL,updateOptions)
          }
    
  
          const handleDelete = async (hai)=>{
              const deleteItemFromList = task.filter((how)=>
              hai!==how.id)
              setTask(deleteItemFromList)
              //localStorage.setItem("updatedToDo",JSON.stringify(deleteItemFromList))

              const deleteFromAPI = deleteItemFromList.filter((hi)=> hai!==hi.id)
              const deleteOptions = {
                method:'DELETE',
                headers:{
                    'Content-Type':'application/JSON'
                },
                body: JSON.stringify(deleteFromAPI)
              }
              const reqURL = `${API_URL}/${hai}`
              const result = await apiRequest(reqURL,deleteOptions)
          }
  
      // const addItemToList = (work)=>{
      //     const id = task.length ? task[task.length - 1].id + 1 : 1
      //     const newToDo = {id,work,checked:false}
      //     const newAddedItems = [...task,newToDo]
      //     // setTask(newAddedItems)
      //     console.log(newAddedItems)
     // }
  
  
     const [fetchItems,setFetchItems] = useState(null)
     const [isLoading,setIsLoading] = useState(true)
  
     useEffect(()=>{
  
      const fetchItemsFromDB = async()=>{
          const API_URL = 'http://localhost:3500/items';
          try{
              const response = await fetch(API_URL);
              if (!response.ok) throw Error("Data not received from DB");
              const listItems = await response.json();
              setTask(listItems)
              setFetchItems(null)
              console.log(listItems)
          }
          catch(err){
              console.log(err.message)
              setFetchItems(err.message)
          }
          finally{
              setIsLoading(false)
          }
      }
  
      
         setTimeout(()=>{
          (async()=> await fetchItemsFromDB()) ()
         },3000)
      
    },[])
  
    

  return (
    <div className='App'>
    <Header title="New ToDo App"/>
    <AddItem className="AddItem"
        task={task}
        setTask={setTask}
        // API_URL={API_URL}
        setFetchItems={setFetchItems}/>
    {
    <ContentWrapper 
    task = {task}
    setTask = {setTask}
    handleCheck = {handleCheck}
    handleDelete = {handleDelete}
    fetchItems = {fetchItems}
    setFetchItems = {setFetchItems}
    isLoading = {isLoading}
    setIsLoading = {setIsLoading}
    />}
    </div>
  );
}

export default App;
