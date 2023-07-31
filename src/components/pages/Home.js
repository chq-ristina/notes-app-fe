import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import Main from '../Main'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';

function Home() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);
  const [activeTab, setActiveTab] = useState("My Notes");

  const username = useSelector((state) => state.user.value.username);
  const token = useSelector((state) => state.userToken.value.userToken.userToken);
  const user_id = useSelector((state) => state.user.value.user_id);
  const logged_in = useSelector((state) => state.user.value.logged_in);

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  console.log("token: ", token);
  console.log("username: ", username)



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
    const request = {
      id: id
    }

    try{
      axios.get(
        "http://localhost:8080/api/v1/user/get-username",
        {
          headers: config.headers,
          params: 
            { id: id}
        }
      )
      .then(res => {
        return res.data.username;
      })
    } catch(e){
      console.log(e);
    }
  }


  useEffect(() => {
    if (logged_in) {
      if (activeTab === "My Notes") {
        getNotes();
      }

      if (activeTab === "Shared with me") {
        getSharedNotes();
      }
    }

  }, [activeTab])

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
        })
    } catch (e) {
      console.log(e);
    }
  };

  const onUpdateNote = async (updatedNote, key) => {
    //need to figure out how to conditionally set up the object ... might have to do an ugly if else type of thing
    //let updatedKey = "updatedT" + key.substring(1);
    const updatedNotesArray = notes.map(async (note) => {
      if (note.id === updatedNote.id) {
        // if(key === "title"){
        //   const update = {
        //     id: updatedNote.id,
        //     updateTitle: updatedNote.title
        //   }
        // }
        // else if(key === "text"){
        //   const update = {
        //     id: updatedNote.id,
        //     updateText: updatedNote.text
        //   } 

        // }
        // console.log("updated note: ", updatedNote);
        // const update = {
        //   id: updatedNote.id,
        //   updateTitle: updatedNote?.title,
        //   updateText: updatedNote?.text
        // }
        // try{
        //   await axios.patch(
        //     "http://localhost:8080/api/v1/note/update",
        //     update,
        //     config
        //   ).then( res => {
        //     console.log("response: ", res.data);
        //     return updatedNote;
        //   })
        // }catch (e){
        //   console.log(e);
        // }
        return updatedNote;
      }
      return note;
    });

    setNotes(updatedNotesArray);
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
      })
    } catch (e) {
      console.log(e);
    }

  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  }

  return (
    <div className='Home'>
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        getUsername={getUsername}
      />
      <Main
        activeNote={getActiveNote()}
        onUpdateNote={onUpdateNote}
      />
    </div>
  )
}

export default Home