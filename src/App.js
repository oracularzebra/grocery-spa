import React, { useState } from "react";
import AddItem from "./addItem";
import List from "./itemList";
import SearchItem from "./searchItem";
import { useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Axios from "./axiosApi";

function App() {

  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [newTask, setNewTask] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [foundSearchResult, setFoundSearchResult] = useState(true);


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const request = await Axios();
        setList(request.data);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleCheckButton = async (itemId) => {
    
    const newList = list.map(item => item.id === itemId ? {id:itemId, checked:!item.checked, value:item.value}:item);
    setList(newList);
    const newItem = newList.find(item=>item.id===itemId);
    const updatedItem = {id:newItem.id, value:newItem.value, checked:newItem.checked};
    const request = await Axios({url:`${itemId}`,method:'patch', data:updatedItem});
    if(request.status > 300){
      console.log('Please reload the page');
    }
  }; 

  async function handleDeleteButton(itemId) {
    const newlist = list.filter((item) => {
      if (item.id === itemId) {
        return false;
      } else {
        return true;
      }
    });
    setList([...newlist]);
    const request = await Axios({method:'delete', url:`${itemId}`})
    if(request.status > 300){
      console.log('Please reload the page');
    }
  }

  const addItem = async (value) => {
    const id = list.length ? list[list.length - 1].id + 1 : 1;
    const checked = false;
    const newItem = { id, checked, value };
    const newList = [...list, newItem];
    setList(newList);

    const request = await Axios({method:'post', data:newItem});
    if(request.status > 300){
      console.log('Please reload the page');
    }
  };
  function handleAddButton(e) {
    e.preventDefault();
    if (!newTask) return;
    addItem(newTask);
    setNewTask("");
  }
  function handleChange(e) {
    setNewTask(e.target.value);
  }
  function handleSearch(e){
    setSearch(e.target.value);
    const newList = list.filter(item => item.value.toLowerCase().includes(e.target.value.toLowerCase()));
    newList.length ? setFoundSearchResult(true):setFoundSearchResult(false);
  }
  return (
    <div className="app">
      <AddItem
        newItem={newTask}
        handleChange={handleChange}
        handleClick={handleAddButton}
      />
      {!isLoading ? (
        list.length > 0 ? (
          <SearchItem search={search} handleSearch={handleSearch} />
        ) : (
          <h3>All Done !😀</h3>
        )
      ) : (
        <p>Loading...</p>
      )}
      {/* <main> */}
        {isLoading && <Box sx={{
          display:'flex',
          justifyContent:'left',
          alignItems:'center',
          position:'inherit',
          minHeight:'8vh',
          padding:'10px',
          overflow:'hidden',
        }}><CircularProgress color="primary"/></Box>}
        {!isLoading && (
           foundSearchResult===true ? <List
            list={list.filter(item => item.value.toLowerCase().includes(search.toLowerCase()))}
            handleCheckButton={handleCheckButton}
            handleDeleteButton={handleDeleteButton}
          />
          : <h4 style={{
            textAlign:'center',
            padding:'4px',
            marginTop:'5px'
          }}>Found nothing 😃</h4>
        )}
      {/* </main> */}
    </div>
  );
}

export default App;
