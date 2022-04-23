import React, { useState } from "react";
import AddItem from "./addItem";
import List from './itemList'
import SearchItem from "./searchItem";
import { useEffect } from "react";
import apiRequest from "./apiRequest";

function App() {

  const API_URL = 'http://localhost:3500/item';

  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [newTask, setNewTask] = useState('');
  // const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //Runs only for the first time before the render, if we don't define the dependency list.
  //if we define the dependency list then the useEffect will only work when
  //the value inside the list changes.
  useEffect(()=>{
    const fetchItems = async () => {
      try{
        const response = await fetch(API_URL);
        if(!response.ok){ throw Error('Did not receive expected data');}
        const listItems = await response.json();
        setList(listItems);
        // setFetchError(null);
      }catch(err){
        // setFetchError(err.message);
      }finally{
        setIsLoading(false);
      }
    }
    setTimeout(()=>{
      fetchItems()
    }, 1000);
  },[]);
  
  const handleCheckButton= async (itemId) => {
    const newlist = list.map(item=>item.id===itemId?{...item, checked:!item.checked}:item);
    setList(newlist);

    const myItem = newlist.filter(item => item.id === itemId);
    const upDateOptions = {
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({ checked:myItem[0].checked })
    };
    const reqUrl = `${API_URL}/${itemId}`;
    const result = await apiRequest(reqUrl, upDateOptions);
    console.log(myItem);
  }

  async function handleDeleteButton(itemId){
    const newlist = list.filter((item)=>{
      if(item.id === itemId){
        return false;
      }else{
        return true;
      }
    })
    setList([...newlist]);

    const deleteOptions = {
      method:'DELETE'
    }
    const reqUrl = `${API_URL}/${itemId}`;
    const result = await apiRequest(reqUrl, deleteOptions);
  }
  
  const addItem= async (value)=>{
    const id = list.length ? list[list.length-1].id+1:1;
    const checked = false;
    const newItem = {id, checked, value};
    const newList = [...list, newItem];
    setList(newList);

    const postOptions = {
      method:'POST', 
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(newItem)
    }
    const result = await apiRequest(API_URL, postOptions);
  }
  function handleAddButton(e){
    e.preventDefault();
    if(!newTask) return ;
    addItem(newTask);
    setNewTask('');
  }
  function handleChange(e){
    setNewTask(e.target.value);
  }
  return (
    <div className="app">
      <AddItem newItem={newTask} handleChange={handleChange} handleClick={handleAddButton}/>
      <SearchItem search={search} setSearch={setSearch}/>
      <main>
        {isLoading && <p>Loading Items</p>}
        {!isLoading && <List list={list
        .filter(item=>{
          if(item.value.toLowerCase().includes(search.toLowerCase())){
            return true;
          }
          else{
            return false;
          }
        }
        )
        } handleCheckButton={handleCheckButton} handleDeleteButton={handleDeleteButton}/>}
      </main>
    </div>
  )
}

export default App;
