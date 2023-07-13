import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Form.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserToken } from '../../redux/features/UserToken';

function Register() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [username, setUsername] = useState('');

  const [err, setErr] = useState(false);
  const [empty, setEmpty] = useState(false);

  async function submit(e) {
    e.preventDefault();

    if(email === '' || password === '' || fname === '' || lname === '' || username === ''){
      setEmpty(true);
      if(err) setErr(false);
      return;
  }

    const user = {
      firstName: fname,
      lastName: lname,
      userName: username,
      email: email,
      password: password
    }

    try{
      await axios.post("http://localhost:8080/api/v1/auth/register", user)
      .then(res => {
        console.log("res: ", res.data);
        dispatch(setUserToken({userToken: res.data.token}));
      })
    }catch(e) {
      setErr(true);
      if(empty) setEmpty(false);
      console.log(e);
    }
  }

  return (
    <div className='form-container'>
        <div className='form-wrapper'>
            <span className='title'><strong>Register</strong></span>
            <form /*action='POST'*/>
                <input required type='text' onChange={(e) => setFName(e.target.value)} placeholder='First name'></input>
                <input required type='text' onChange={(e) => setLName(e.target.value)} placeholder='Last name'></input>
                <input required type='text' onChange={(e) => setUsername(e.target.value)} placeholder='Username'></input>
                <input required type='email' onChange={(e) => setEmail(e.target.value)} placeholder='email'></input>
                <input required type='password' onChange={(e) => setPassword(e.target.value)} placeholder='password'></input>
                <button onClick={submit}>Sign Up</button>
                {err && <span className='error'>Something went wrong</span>}
                {empty && <span className='error'>You must fill in all fields</span>}
                {/*{exists && <span className='error'>Account already exist</span>} */}
            </form>
            <p>Have an account? <Link to='/login'>Login</Link></p>
        </div>
    </div>
  )
}

export default Register