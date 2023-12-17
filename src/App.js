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

function App() {
  const logged_in = useSelector((state) => state.user.value.logged_in);
  const username = useSelector((state) => state.user.value.username);
  const token = useSelector((state) => state.userToken.value.userToken.userToken);
  const user_id = useSelector((state) => state.user.value.user_id);
  const [pendingShared, setPendngShared] = useState([]);

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

  useEffect(() => {
    getPendingShared();
  }, [])


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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
