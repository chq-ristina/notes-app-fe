import React, { useState } from 'react'
import SearchBar from './SearchBar'

function ShareModal({
  activeNote,
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
  setShareError
}) 
{
  const onClick = () => {
    console.log("closing shared modal");
    const modal = document.getElementsByClassName('shared-modal')
    setOpenSharedModal(false);
    modal[0].close();
    setShareError(null);
    setAbleToShare(null);
    setSearchInput("");
  }

  const [targetUser, setTargetUser] = useState("");
  const [requestedToShare, setRequestedToShare] = useState(false);

  const onShare = () => {

  }

  console.log("Shared list: ", shared);

  shared = shared.filter(x => x.shared.accepted == true);
  console.log("modified shared list: ", shared)
  return (
    <div className='share-modal'>
        <dialog /*open*/ id="modal" class="shared-modal modal">
            <h3>Share your note</h3>
            <SearchBar
              activeNote={activeNote}
              onShareNote={onShareNote}
              setAbleToShare={setAbleToShare}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              setShareError={setShareError}
            />
            {ableToShare && <p>Requested to share with {searchInput}</p>}
            {!ableToShare && <p style={{color:"red"}}>{shareError}</p>}
            {shared.length > 0 && <p>People you shared with</p>}
            <div>
              {/* {shared.map(user => {
                // console.log(user);
                (
                  <p>{user.taregtUser}</p>
                )
              })} */}
              {shared.map((user) => 
              {
                return(
                  <p>{user.targetUsername}</p>
                )
              })}
            </div>
            <button onClick={onClick} id="closeModal" class="modal-close-btn">Close</button>
        </dialog>
    </div>
  )
}

export default ShareModal