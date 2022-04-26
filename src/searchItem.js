import React from "react";
import TextField from "@mui/material/TextField";

const SearchItem = ({ search, setSearch, handleSearch }) => {
  return (
    <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
      <TextField
        type="text"
        id="search"
        value={search}
        onChange={handleSearch}
        placeholder="Search Item"
      />
    </form>
  );
};

export default SearchItem;
