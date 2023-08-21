import './App.css';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/pages/Landing';

/*
TODO: Install mui dependencies
*/
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing/>}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
