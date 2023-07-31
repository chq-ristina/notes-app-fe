import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Sidebar({
    notes,
    onAddNote,
    onDeleteNote,
    activeNote,
    setActiveNote,
    activeTab,
    setActiveTab,
    getUsername }) {

    const username = useSelector((state) => state.user.value.username);

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
                        {console.log(note)}
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
                            {console.log("getusername:", getUsername(note.user_id))}
                            By {username}
                        </small>

                    </div>
                ))}

            </div>
        </div>
    )
}

export default Sidebar