import React, { useState } from 'react'
import Hamburger from 'hamburger-react'
import Mobilepagenavbar from './navbarForMobile.js'
import Register from '../../Register/Register.js'
import Login from "../../Login/Login.js"


const Navbar = () => {
  //usestate for Humberger icon
  const [IsHamburgerClicked, setIsHamburgerClicked] = useState(false);
  // usestate for registration button
  const [IsRegisterClicked, setRegisterClicked] = useState(false)
  // usestate for Sign button
  const [IsSignInClicked, setSignInClicked] = useState(false)



  function ClickHamburger() {
    setIsHamburgerClicked(() => !IsHamburgerClicked)
  }

  // register button
  function registerButton() {
    setRegisterClicked((pre) => !pre)
  }

  //Sign button
  function SignInButton() {
    setSignInClicked((pre) => !pre)
  }


  return (
    <div className='navbar--container'>
      <nav className='navbar'>
        <h2>SwipTory</h2>
        <div>
          <button onClick={registerButton}>Register Now</button>
          <button onClick={SignInButton}>Sign In</button>
        </div>
      </nav>

      <div className="Hamburger" onClick={ClickHamburger}>
        <Hamburger ></Hamburger>
      </div>

      {IsHamburgerClicked && <Mobilepagenavbar />}
      {IsRegisterClicked && <Register setRegisterClicked={setRegisterClicked} />}
      {IsSignInClicked && <Login setSignInClicked={setSignInClicked}/>}
    </div>
  )
}

export default Navbar