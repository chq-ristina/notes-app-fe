import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Form.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserToken } from '../../redux/features/UserToken';
import { setUser } from '../../redux/features/User';
import BASE_URL from '../../helpers/baseUrl';

function Login() {
    const dispatch = useDispatch();
    const history = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [err, setErr] = useState(false);
    const [empty, setEmpty] = useState(false);

    async function submit(e) {
        e.preventDefault();

        if(email === '' || password === ''){
            setEmpty(true);
            if(err)setErr(false);
            return;
        }

        const user = {
            email: email,
            password: password
        }

        console.log("user:", user);

        try{
            await axios.post(BASE_URL + `auth/authenticate`, user)
            .then(res => {
                console.log("response:", res.data);
                dispatch(setUserToken({userToken: res.data.token}));
                dispatch(setUser({username: res.data.userName, user_id: res.data.userId}))
                history("/home");
                
            })

        }catch (e){
            setErr(true);
            if(empty) setEmpty(false);
            console.log(e);
        }
        
    }
    return (
        <div className='form-container'>
            <div className='form-wrapper'>
                <span className='title'><strong>Login</strong></span>
                <form /*action='POST'*/>
                    <input required type='email' onChange={(e) => setEmail(e.target.value)} placeholder='email'></input>
                    <input required type='password' onChange={(e) => setPassword(e.target.value)} placeholder='password'></input>
                    <button onClick={submit}>Login</button>
                    {err && <span className='error'>Wrong email or password</span>}
                    {empty && <span className='error'>You must fill in all fields</span>}
                    {/*{errEmailPass && <span className='error'>Wrong email or password</span>} */}
                </form>
                <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
            </div>
        </div>
    )
}

export default Login