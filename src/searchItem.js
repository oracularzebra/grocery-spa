import React from 'react'

const SearchItem = ({search, setSearch, handleSearch}) => {
  return (
        <form className="searchForm" onSubmit={(e)=>e.preventDefault()}>
            <input type="text" id='search' value={search} onChange={handleSearch} 
            placeholder='Search Item'/>
        </form>
  )
}

export default SearchItem