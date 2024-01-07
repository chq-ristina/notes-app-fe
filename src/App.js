import './App.css';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/pages/Landing';
import { useDispatch, useSelector } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShareRequest from './components/pages/ShareRequest';
import { jwtDecode } from "jwt-decode";
import { removeUser } from './redux/features/User';
import { removeUserToken } from './redux/features/UserToken';

function App() {
  const logged_in = useSelector((state) => state.user.value.logged_in);
  const username = useSelector((state) => state.user.value.username);
  const token = useSelector((state) => state.userToken.value.userToken.userToken);
  const user_id = useSelector((state) => state.user.value.user_id);
  const [pendingShared, setPendngShared] = useState([]);
  const [author, setAuthor] = useState("");

  // window.onload = function()
  // {
  //   if(token != null){
  //     const decode = jwtDecode(token);
  //     const expiredToken = Date.now > decode.exp;
  
  //     if(expiredToken){
  //       // useDispatch(removeUser());
  //       // useDispatch(removeUserToken());
  //       window.localStorage.clear();
  //     }
  //   }
  // }

  let expiredToken = false;
  if(token != null){
    const decode = jwtDecode(token);
    /*const*/ expiredToken = Date.now > decode.exp;

    if(expiredToken){
      console.log("EXPIRED TOKEN!!!!!!")
      // useDispatch(removeUser());
      // useDispatch(removeUserToken());
      localStorage.clear();
      //window.localStorage.clear();
      // localStorage.removeItem('userToken');
      // localStorage.removeItem('username');
      // localStorage.removeItem('logged_in');
      // localStorage.removeItem('user_id');
      //useHandleExpiredToken();
    }
  }

  const useHandleExpiredToken = () => {
    useDispatch(removeUser());
    useDispatch(removeUserToken());
  }
  useEffect(() => {
    if(token != null){
      const decode = jwtDecode(token);
      const today = new Date();
      const expiredToken = today > decode.exp;
      if(expiredToken){
        console.log("EXPIRED TOKEN!!!!!!")
        // useDispatch(removeUser());
        // useDispatch(removeUserToken());
        localStorage.clear();
        //window.localStorage.clear();
        // localStorage.removeItem('userToken');
        // localStorage.removeItem('username');
        // localStorage.removeItem('logged_in');
        // localStorage.removeItem('user_id');
        //useHandleExpiredToken();
      }
      // else{
      //   getPendingShared();
      // }
    }
  }, [])
  
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const getPendingShared = async() => {
    try{
      axios.get(
        `http://localhost:8080/api/v1/shared/get-pending?query=${user_id}`,
        {
          headers: config.headers
        }
      ).then(res => {
        console.log("sharedPending results: ", res.data);
        setPendngShared(res.data);
      })
    } catch(e){
      console.log(e);
    }
  }

  const getUsernameById = async (user_id, note) => {
    try{
        axios.get(
          `http://localhost:8080/api/v1/user/get-username?id=${user_id}`,
          {
            headers: config.headers
          }
        ).then(async (res) => {
          console.log("get username results: ", res.data.username);
          note.author = res.data.username;
          setAuthor(res.data.username);
          console.log(author);
        })
      } catch(e){
        console.log(e);
      }
}

  useEffect(() => {
    if(token != null){
      getPendingShared();
    }

    console.log(pendingShared);
  }, [token])

  useEffect(() => {
    const fetchNoteAuthor = async() => {
      pendingShared.forEach(async (note) => {
        await getUsernameById(note.user_id, note);
        // note.author = author;
        console.log("fetch author note: ", note);
      })
    }

    fetchNoteAuthor();
  }, [pendingShared])

  return (
    <div className="App">
      <Router>
        <Navbar 
          logged_in={logged_in}
          username={username}
          pendingShared={pendingShared}
        />
        <Routes>
          <Route path='/' element={<Landing/>}></Route>
          <Route 
            path='/home' 
            element={
              <ProtectedRoute logged_in={logged_in}>
                <Home
                  username={username}
                  token={token}
                  user_id={user_id}
                  pendingShared={pendingShared}
                  setPendngShared={setPendngShared}
                  config={config}
                  getPendingShared={getPendingShared}
                />
              </ProtectedRoute>
            }
          >  
          </Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route
            path='/share-request'
            element={
              <ProtectedRoute logged_in={logged_in}>
                <ShareRequest
                  pendingShared={pendingShared}
                  config={config}
                />
              </ProtectedRoute>
            }
          >
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
