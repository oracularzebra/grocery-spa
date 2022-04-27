import React, { useState, useReducer } from "react";
import AddItem from "./addItem";
import ItemList from "./itemList";
import SearchItem from "./searchItem";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Axios from "./axiosApi";

function App() {
  const listReducer = (list, action) => {
    switch (action.type) {
      case "fetch": {
        return action.list;
      }
      case "added": {
        const newList = [...list, action.item];
        return newList;
      }
      case "delete": {
        const newList = list.filter((item) => item.id !== action.id);
        return newList;
      }
      case "checked": {
        const itemId = action.id;
        const newList = list.map((item) =>
          item.id === itemId
            ? { id: itemId, checked: !item.checked, value: item.value }
            : item
        );
        console.log(newList);
        return newList;
      }
      default: {
        console.log("Invalid operation");
      }
    }
  };

  const [list, dispatch] = useReducer(listReducer, []);
  const [search, setSearch] = useState("");
  const [newTask, setNewTask] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [foundSearchResult, setFoundSearchResult] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const request = await Axios();
      dispatch({
        type: "fetch",
        list: request.data,
      });
      setIsLoading(false);
    };
    fetchItems();
  }, []);

  const handleCheckButton = async (itemId) => {
    dispatch({
      type: "checked",
      id: itemId,
    });
    const newList = list.map((item) =>
      item.id === itemId
        ? { id: itemId, checked: !item.checked, value: item.value }
        : item
    );
    const newItem = newList.find((item) => item.id === itemId);
    const request = await Axios({
      url: `${itemId}`,
      method: "patch",
      data: newItem,
    });
    if (request.status > 300) {
      console.log("Please reload the page");
    }
  };

  async function handleDeleteButton(itemId) {
    dispatch({
      type: "delete",
      id: itemId,
    });
    const request = await Axios({ method: "delete", url: `${itemId}` });
    if (request.status > 300) {
      console.log("Please reload the page");
    }
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
    const request = await Axios({ method: "post", data: newItem });
    if (request.status > 300) {
      console.log("Please reload the page");
    }
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
