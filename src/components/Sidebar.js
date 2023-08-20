import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';

function Sidebar({
    config,
    notes,
    onAddNote,
    onDeleteNote,
    activeNote,
    setActiveNote,
    activeTab,
    setActiveTab,
    getUsername,
    noteUsername }) {

    const username = useSelector((state) => state.user.value.username);
    const [name, setName] =  useState();

    // const getUsername = async (id) => {
    //     try{
    //       axios.get(
    //         "http://localhost:8080/api/v1/user/get-username",
    //         {
    //           headers: config.headers,
    //           params: 
    //             { id: id}
    //         }
    //       )
    //       .then(res => {
    //         setName(res.data.username);
    //       })
    //     } catch(e){
    //       console.log(e);
    //     }
    //   }

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
                {notes?.map((note) => (
                    <div className={`app-sidebar-note ${note.id === activeNote && "active"}`} onClick={() => setActiveNote(note.id)}>
                        {console.log("note", note)}
                        <div className='sidebar-note-title'>
                            <strong>{note.title}</strong>
                            <button onClick={() => onDeleteNote(note.id)}>Delete</button>
                        </div>
                        <p>{note.text && note.text.substr(0, 100) + "..."}</p>
                        <small className='note-meta'>
                            Last modified {new Date(note.dateUpdated).toLocaleDateString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                        </small>
                        <small className='note-meta'>
                            {/* {console.log("getusername:", getUsername(note.user_id), name)} */}
                            By {username}
                        </small>

                    </div>
                ))}

            </div>
        </div>
    )
}

export default Sidebar