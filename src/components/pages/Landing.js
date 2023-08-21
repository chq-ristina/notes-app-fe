import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Landing() {
    return (
        <div className='Landing'>
            <h1>Welcome to E-scribe</h1>
            <h3>The place to jot down your ideas, plans, and whatever else you want</h3>
            <h3>With the click of a button you can save your notes and share your notes with others in seconds</h3>
            <div className='buttons'>
                <button><Link style={{ textDecoration: 'none', color: 'white' }} to='/register'>Sign Up Here</Link></button>
                <button><Link style={{ textDecoration: 'none', color: 'white' }} to='/login'>Login Here</Link></button>
            </div>



        </div>
    )
}

export default Landing