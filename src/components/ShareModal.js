import React, { useState } from 'react'
import SearchBar from './SearchBar'
/*
TODO:
Need to make the plus button actually add the people to share

IDEALLY:
Want user to enter another user's username
(Check to make sure the username isn't the same as the current user and that the username entered exists)
If there is an error... show error message underneath the searchbar
Once a user is added, they will show up underneath the search bar

Maybe in the backend side, be able to track who the note is shared with (might already have that) and show that on 
the front end side, so when a user clicks on this, they can see who they've shared this note with
Also show if someone has accepted the share request (maybe through color of their username)
*/

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

  shared = shared.filter(x => x.accepted == true);
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
              {shared.map(user => {
                console.log(user);
                (
                  <p>{user.targetUser}</p>
                )
              })}
              {/* {shared.map((user) => 
              {
                return(
                  <p>{user.targetUser}</p>
                )
              })} */}
            </div>
            <button onClick={onClick} id="closeModal" class="modal-close-btn">Close</button>
        </dialog>
    </div>
  )
}

export default ShareModal