import React, { useState } from 'react'
import SearchBar from './SearchBar';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import ShareModal from './ShareModal';

function Main({
  activeNote, 
  onUpdateNote, 
  updatedTitle, 
  setUpdatedTitle, 
  updatedText, 
  setUpdatedText,
  shared,
  setShared,
  openSharedModal,
  setOpenSharedModal,
  onShareNote,
  searchInput,
  setSearchInput,
  ableToShare,
  setAbleToShare,
  shareError,
  setShareError}) 
  {

  const update = (e) => {
    e.preventDefault();

    onUpdateNote(activeNote.note);
  }

  const onEditField = (key, value) => {
    onUpdateNote({
      ...activeNote.note,
      [key]: value
    }, key);
  };

  const onShareClick = () => {
    console.log("open shared modal");
    setOpenSharedModal(true);
  }

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
            <dialog id="modal" class="update-modal modal">
              <p>Note Updated!</p>
              <button id="closeModal" class="modal-close-btn">Close</button>
            </dialog>
            <ShareModal
              activeNote={activeNote.note}
              shared={shared}
              setShared={setShared}
              openSharedModal={openSharedModal}
              setOpenSharedModal={setOpenSharedModal}
              onShareNote={onShareNote}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              ableToShare={ableToShare}
              setAbleToShare={setAbleToShare}
              shareError={shareError}
              setShareError={setShareError}
            />
            <textarea 
              id='body' 
              placeholder='Write your note here...' 
              //value={activeNote.text}
              value={updatedText}
              onChange={(e) => setUpdatedText(e.target.value)}
            />
            <div className='app-main-buttons'>
              <button onClick={update}>
                Save
              </button>
              <button className='share-button' onClick={onShareClick}>
                <PersonAddAltRoundedIcon/>
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