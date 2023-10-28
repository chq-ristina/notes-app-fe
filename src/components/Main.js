import React, { useState } from 'react'

function Main({
  activeNote, 
  onUpdateNote, 
  updatedTitle, 
  setUpdatedTitle, 
  updatedText, 
  setUpdatedText}) 
  {

  /*
  TODO: For updating notes...
  since it's not connected to the db, can probably just use states to save the current/edited state of the active note
  then... when a save button is clicked, actually send the update to the db and thus updating the sidebar
  */

  const update = (e) => {
    e.preventDefault();

    onUpdateNote(activeNote);
  }

  const onEditField = (key, value) => {
    onUpdateNote({
      ...activeNote,
      [key]: value
    }, key);
  };

  if (!activeNote) return <div className='no-active-note'>No note selected</div>

  return (
    <div className='app-main'>
        <div className='app-main-note-edit'>
            <input 
              type='text' 
              id='title' 
              //value={activeNote.title} 
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)} 
              autoFocus 
            />
            <textarea 
              id='body' 
              placeholder='Write your note here...' 
              //value={activeNote.text}
              value={updatedText}
              onChange={(e) => setUpdatedText(e.target.value)}
            />
            <div>
              <button onClick={update}>
                Save
              </button>
            </div>
            
        </div>
        {/* <div className='app-main-note-preview'>
            <h1 className='preview-title'>{updatedTitle}</h1>
            <div className='markdown-preview'>
                {updatedText}
            </div>
        </div> */}
    </div>
  )
}

export default Main