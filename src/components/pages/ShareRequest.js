import React from 'react'

function ShareRequest({pendingShared}) {
  return (
    <div className='share-request'>
        <h2>Pending share requests</h2>
        <div className='shared-request-main'>
            {pendingShared.length < 1 && <h3>There are no pending share requests</h3>}
            {pendingShared.length > 0 && pendingShared.map((note) => (
                <div className='shared-request-note'>
                    <div className='shared-request-title' key={note.Id}>
                        <strong>{note.title}</strong>
                    </div>
                    <p>{note.text && note.text.substr(0, 100) + "..."}</p>
                    <p>By username</p>
                    <div className='shared-request-buttons'>
                        <button
                            style={
                                {
                                    color: "green",
                                    border: "2px solid green",
                                    backgroundColor: "transparent",
                                    cursor: "pointer"
                                }}>
                            accept
                        </button>
                        <button
                            style={
                                {
                                    color: "red",
                                    border: "2px solid red",
                                    backgroundColor: "transparent",
                                    cursor: "pointer"
                                }}>
                            reject
                        </button>
                    </div> 
                </div>
            ))}
        </div>
    </div>
  )
}

export default ShareRequest