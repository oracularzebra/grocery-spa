import React from 'react'

const SearchItem = ({search, setSearch}) => {
  return (
    <div>
        <form className="searchForm" onSubmit={(e)=>e.preventDefault()}>
            <label htmlFor="search"></label>
            <input type="text" id='search' value={search} onChange={(e)=>setSearch(e.target.value)} 
            placeholder='Search Item'/>
        </form>
    </div>
  )
}

export default SearchItem