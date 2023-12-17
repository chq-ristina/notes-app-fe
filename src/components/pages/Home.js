import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import Main from '../Main'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames'

function Home({
  username,
  token,
  user_id,
  pendingShared,
  setPendngShared,
  config,
  getPendingShared
}) {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);
  const [activeTab, setActiveTab] = useState("My Notes");
  const [noteUsername, setNoteUsername] = useState();
  const [updateSideBar, setUpdateSideBar] = useState(false); //for useEffect to update sidebar notes
  const [shared, setShared] = useState([]);
  const [openSharedModal, setOpenSharedModal] = useState(false);
  const [ableToShare, setAbleToShare] = useState(null)
  const [shareError, setShareError] = useState(null)

  const history = useNavigate();

  let openModal = false;
  //let openSharedModal = false;

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  }
  const [updatedTitle, setUpdatedTitle] = useState(null);
  const [updatedText, setUpdatedText] = useState(null);
  const [searchInput, setSearchInput] = useState(null);

  // const username = useSelector((state) => state.user.value.username);
  // const token = useSelector((state) => state.userToken.value.userToken.userToken);
  // const user_id = useSelector((state) => state.user.value.user_id);
  const logged_in = useSelector((state) => state.user.value.logged_in);

  // const config = {
  //   headers: { Authorization: `Bearer ${token}` }
  // };

  // console.log("token: ", token);
  // console.log("username: ", username)

   console.log("active note:", activeNote);
   console.log(typeof(activeNote));

  // console.log("updated title:", updatedTitle, "updated text:", updatedText);

  const closeModal = document.querySelector("#closeModal");
  const openDialog = (modal) => {
    
    modal[0].showModal();
    
    openModal = true;

    closeModal.addEventListener("click", () => {
      console.log("attempting to close modal....");
      if(openSharedModal){
        console.log("closing shared modal");
        setOpenSharedModal(false);
      }
      modal[0].close()
      openModal = false;
    });
  }

  const getNotes = async () => {
    try {
      axios.get(
        "http://localhost:8080/api/v1/note/find-note/user-id",
        {
          headers: config.headers,
          params:
            { query: user_id }
        })
        .then(res => {
          console.log("notes response:", res.data.not);
          setNotes(res.data);
        }
        );
    } catch (e) {
      console.log(e);
    }
  }

  const getSharedNotes = async () => {
    try {
      axios.get(
        "http://localhost:8080/api/v1/shared/get-shared",
        {
          headers: config.headers,
          params:
            { query: user_id }
        })
        .then(res => {
          console.log("shared response: ", res.data);
          setNotes(res.data);
        });
    }
    catch (e) {
      console.log(e);
    }
  }

  const getUsername = async (id) => {
    try {
      axios.get(
        "http://localhost:8080/api/v1/user/get-username",
        {
          headers: config.headers,
          params:
            { id: id }
        }
      )
        .then(res => {
          setNoteUsername(res.data.username);
          return res.data.username;
        })
    } catch (e) {
      console.log(e);
    }
  }

  const getSharedWith = async(id) => {
    console.log("Getting shared list!");
    try{
      axios.get(
        "http://localhost:8080/api/v1/shared/get-shared-by-note-id",
        {
          headers: config.headers,
          params: 
            {id: id}
        }
      )
        .then(res => {
          console.log("sharedWith results: ", res.data);
          setShared(res.data);
        })
    } catch (e){
      console.log(e);
    }
  }

  // const addUsername = async () => {
  //   notes.map(note => ({...note, username: noteUsername}))
  // }

  useEffect(() => {
    if (activeTab === "My Notes"){
      getNotes();
    }
    if (activeTab === "Shared with me"){
      getSharedNotes();
    }
  }, [activeTab, updateSideBar])

  useEffect(() => {
    let note = getActiveNote();
    setUpdatedTitle(note?.title)
    setUpdatedText(note?.text)
  }, [activeNote])

  useEffect(() => {
    console.log("in use effect for opensharedmodal");
    if(openSharedModal && activeNote !== false){
      const modal = document.getElementsByClassName('shared-modal')
      openDialog(modal)
      console.log("going to get shared with")
      getSharedWith(activeNote)
    }
  }, [openSharedModal])

  // const config = {
  //   headers: { Authorization: `Bearer ${token}` }
  // };

  const onAddNote = async () => {
    const newNote = {
      username: username,
      title: "Untitled",
      text: ""
    };

    try {
      await axios.post(
        "http://localhost:8080/api/v1/note/add",
        newNote,
        config)
        .then(res => {
          console.log("response: ", res.data);
          setNotes([res.data, ...notes]);
          setUpdateSideBar(!updateSideBar);
        })
    } catch (e) {
      console.log(e);
    }
  };

  const onUpdateNote = async (updatedNote) => {
    const updatedNotesArray = notes.map(async (note) => {
      let same = updatedTitle === note.title && updatedText === note.text
      if (note.id === updatedNote.id && !same) {
        console.log("UPDATING!!!");
        const update = {
          id: updatedNote.id,
          updateTitle: updatedTitle,
          updateText: updatedText
        }

        try {
          await axios.put(
            "http://localhost:8080/api/v1/note/update",
            update,
            config
          ).then(res => {
            console.log("response: ", res.data);
            //getNotes();
            //window.alert("Updated note!");
            const modal = document.getElementsByClassName('update-modal');
            openDialog(modal);
            setUpdateSideBar(!updateSideBar);
          })
        } catch (e) {
          console.log(e);
        }
      }
      console.log("note in update:", note)
      // return note;
    });
  };

  const onShareNote = async (sharedNote, targetUser) => {
    const sharedRequest = {
      noteId: sharedNote.id,
      sourceUsername: username,
      targetUsername: targetUser
    }

    try{
      await axios.post(
        "http://localhost:8080/api/v1/shared/add",
        sharedRequest,
        config
      ).then( res => {
        console.log("response: ", res.data);
        let sharedResponse = res.data

        if(sharedResponse?.error){
          setShareError(sharedResponse.errorMessage);
        }else{
          setAbleToShare(true);
        }
      })
    }
    catch(e) {
      console.log(e.config);
      setShareError("An error occurred")
    }
  };

  const onDeleteNote = async (idToDelete) => {
    console.log("id to delete: ", idToDelete);
    const noteToDelete = {
      id: idToDelete
    };

    // console.log(config);
    // console.log(noteToDelete);
    // console.log(typeof(idToDelete));

    try {
      await axios.delete(
        "http://localhost:8080/api/v1/note/delete",
        {
          headers: config.headers,
          data: noteToDelete
        }
      ).then(res => {
        console.log("response: ", res.data);
        setNotes(notes.filter((note) => note.id !== idToDelete));
        setUpdateSideBar(!updateSideBar);
      })
    } catch (e) {
      console.log(e);
    }

  }

  return (
    <div className={openModal ? 'Home modalBackground' : 'Home'}>
      <Sidebar
        config={config}
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        getUsername={getUsername}
        noteUsername={noteUsername}
      />
      <Main
        activeNote={getActiveNote()}
        onUpdateNote={onUpdateNote}
        updatedTitle={updatedTitle}
        setUpdatedTitle={setUpdatedTitle}
        updatedText={updatedText}
        setUpdatedText={setUpdatedText}
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
    </div>
  )
}

export default Home