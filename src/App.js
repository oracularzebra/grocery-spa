import React, { useState, useReducer } from "react";
import AddItem from "./addItem";
import ItemList from "./itemList";
import SearchItem from "./searchItem";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function App() {
  const listReducer = (list, action) => {
    switch (action.type) {
      case 'fetch':{
        return action.list || [];
      }
      case "added": {
        const newList = [...list, action.item];
        localStorage.setItem('list', JSON.stringify(newList));
        return newList;
      }
      case "delete": {
        const newList = list.filter((item) => item.id !== action.id);
        localStorage.setItem('list', JSON.stringify(newList));
        return newList;
      }
      case "checked": {
        const itemId = action.id;
        const newList = list.map((item) =>
          item.id === itemId
            ? { id: itemId, checked: !item.checked, value: item.value }
            : item
        );
        localStorage.setItem('list', JSON.stringify(newList));
        return newList;
      }
      default: {
        console.log("Invalid operation");
        return ;
      }
    }
  };

  const [list, dispatch] = useReducer(listReducer, []);
  const [search, setSearch] = useState("");
  const [newTask, setNewTask] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [foundSearchResult, setFoundSearchResult] = useState(true);

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem('list')))
      dispatch({
        type:'fetch',
        list:JSON.parse(localStorage.getItem('list'))
      })
      setIsLoading(false);
  }, []);

  const handleCheckButton = async (itemId) => {
    dispatch({
      type: "checked",
      id: itemId,
    });
  };

  async function handleDeleteButton(itemId) {
    dispatch({
      type: "delete",
      id: itemId,
    });
  }

  const addItem = async (value) => {
    const checked = false;
    const id = list.length ? list[list.length - 1].id + 1 : 1;
    const newItem = { id, checked, value };
    dispatch({
      type: "added",
      id: id,
      item: newItem,
    });
  };
  function handleAddButton(e) {
    e.preventDefault();
    if (!newTask) return;
    addItem(newTask);
    setNewTask("");
  }
  function handleInputChange(e) {
    setNewTask(e.target.value);
  }
  function handleSearch(e) {
    setSearch(e.target.value);
    const newList = list.filter((item) =>
      item.value.toLowerCase().includes(e.target.value.toLowerCase())
    );
    newList.length ? setFoundSearchResult(true) : setFoundSearchResult(false);
  }
  return (
    <div className="app">
      <AddItem
        newItem={newTask}
        handleChange={handleInputChange}
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
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            position: "inherit",
            minHeight: "8vh",
            padding: "10px",
            overflow: "hidden",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      )}
      {!isLoading &&
        (foundSearchResult === true ? (
          <ItemList
            list={list.filter((item) =>
              item.value.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheckButton={handleCheckButton}
            handleDeleteButton={handleDeleteButton}
          />
        ) : (
          <h4
            style={{
              textAlign: "center",
              padding: "4px",
              marginTop: "5px",
            }}
          >
            Found nothing 😃
          </h4>
        ))}
    </div>
  );
}

export default App;
