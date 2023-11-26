import React, { useState } from 'react'
import Register from '../../Register/Register';
import Login from '../../Login/Login';

const Mobilepagenavbar = (props) => {

    // usestate for registration button
    const [IsRegisterClicked, setRegisterClicked] = useState(false)
    // usestate for Sign button
    const [IsSignInClicked, setSignInClicked] = useState(false)
    const [showMobileNav, setShowMobilenav] = useState(false);

    // register button
    function registerButton() {
        setRegisterClicked((pre) => !pre)
        setShowMobilenav((pre) => !pre)
    }

    //Sign button
    function SignInButton() {
        setSignInClicked((pre) => !pre)
        setShowMobilenav((pre) => !pre)
    }


    return (

        <>
            {IsRegisterClicked && <Register setRegisterClicked={setRegisterClicked} />}
            {IsSignInClicked && <Login setSignInClicked={setSignInClicked} />}
            <div className='Navbar--for--Mobile' style={{ display: showMobileNav ? "none" : "block" }}>
                <div>
                    <button onClick={registerButton}>Register Now</button>
                    <button onClick={SignInButton}>Sign In</button>
                </div>
            </div>

        </>

    )
}

export default Mobilepagenavbar