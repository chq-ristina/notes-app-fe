import './App.css';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/pages/Landing';
import { useDispatch, useSelector } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const logged_in = useSelector((state) => state.user.value.logged_in);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing/>}></Route>
          <Route 
            path='/home' 
            element={
              <ProtectedRoute logged_in={logged_in}>
                <Home/>
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
