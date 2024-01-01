import React from 'react'
import axios from 'axios';

function ShareRequest({
    pendingShared,
    config}) 
{
    // const getUsernameById = (user_id) => {
    //     try{
    //         axios.get(
    //           `http://localhost:8080/api/v1/user/get-username?id=${user_id}`,
    //           {
    //             headers: config.headers
    //           }
    //         ).then(res => {
    //           console.log("get username results: ", res.data);
    //           username = res.data.username;
    //         })
    //       } catch(e){
    //         console.log(e);
    //       }
    // }
  return (
    <div className='share-request'>
        <h2>Pending share requests</h2>
        <div className='shared-request-main'>
            {pendingShared.length < 1 && <h3>There are no pending share requests</h3>}
            {pendingShared.length > 0 && pendingShared.map((note) => 
                (
                <div className='shared-request-note'>
                    <div className='shared-request-title' key={note.Id}>
                        <strong>{note.title}</strong>
                    </div>
                    <p>{note.text.length > 200 ? note.text.substr(0, 200) + "..." : note.text}</p>
                    <p>By {note.author}</p>
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