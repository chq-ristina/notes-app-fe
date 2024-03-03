import React, { useState } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded';

function SearchBar({
  activeNote,
  onShareNote,
  setAbleToShare,
  searchInput,
  setSearchInput,
  setShareError
}) 
{
  const onShare = () => {
    onShareNote(activeNote, searchInput)
  }
  return (
    <div className='search-bar-div'>
          <input className='search-bar'
              type="text"
              placeholder="Username"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput} 
            />
          {/* <label class="checkbox-container">read only
            <input type="checkbox"/>
            <span class="checkmark"></span>
          </label> */}
            <button onClick={onShare}>
                <AddRoundedIcon/>
            </button>
    </div>
  )
}

export default SearchBar