import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import BASE_URL from '../helpers/baseUrl';

function Sidebar({
    config,
    notes,
    onAddNote,
    onDeleteNote,
    activeNote,
    setActiveNote,
    activeTab,
    setActiveTab,
    // getUsernameById,
    // getUsername,
    noteUsername }) {

    const username = useSelector((state) => state.user.value.username);
    const [name, setName] =  useState();
    let reversedNotes = [...notes].reverse();

    const getUsername = (id) => {
        try{
          axios.get(
            BASE_URL + `user/get-username`,
            {
              headers: config.headers,
              params: 
                { id: id}
            }
          )
          .then(res => {
           console.log("Username: ", res.data.username);
           return res.data.username;
          })
        } catch(e){
          console.log(e);
        }
      }
    
    
    return (
        <div className='app-sidebar'>
            <div className='app-sidebar-header'>
                <div className='app-sidebar-header-column'>
                    <h4
                        className={`left ${activeTab === "My Notes" && "active"}`}
                        onClick={() => setActiveTab("My Notes")}
                    >
                        My Notes
                    </h4>
                    <h4
                        className={`right ${activeTab === "Shared with me" && "active"}`}
                        onClick={() => setActiveTab("Shared with me")}
                    >
                        Shared with me
                    </h4>
                </div>
                <button onClick={onAddNote}>Add</button>
            </div>
            <div className='app-sidebar-notes'>
                {reversedNotes?.map(({note, author}) => (
                    // console.log("note: ", note),
                    <div className={`app-sidebar-note ${note?.id === activeNote && "active"}`} onClick={() => setActiveNote(note?.id)}>
                        {/* {console.log("note", note)} */}
                        <div className='sidebar-note-title'>
                            <strong>{note?.title}</strong>
                            {activeTab === "My Notes" && <button onClick={() => onDeleteNote(note?.id)}>Delete</button>}
                        </div>
                        <p>{note?.text.length > 100 ? note?.text.substr(0, 100) + "..." : note?.text}</p>
                        {note?.modifiedBy !== null && 
                            <small className='note-meta'>
                                Last modified {new Date(note?.dateUpdated).toLocaleDateString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })} by {note?.modifiedBy}
                            </small>
                        }
                        {note?.modifiedBy === null && 
                        <small className='note-meta'>
                        Last modified {new Date(note?.dateUpdated).toLocaleDateString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit"
                        })}
                        </small>
                        }
                        
                        <small className='note-meta'>
                            {/* {console.log("getusername:", getUsername(note.user_id), name)} */}
                            By {author}
                        </small>

                    </div>
                ))}

            </div>
        </div>
    )
}

export default Sidebar