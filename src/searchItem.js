import React from 'react'

const SearchItem = ({search, setSearch}) => {
  return (
        <form className="searchForm" onSubmit={(e)=>e.preventDefault()}>
            <input type="text" id='search' value={search} onChange={(e)=>setSearch(e.target.value)} 
            placeholder='Search Item'/>
        </form>
  )
}

export default SearchItem