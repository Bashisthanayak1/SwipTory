import React, { useState } from 'react'
import Hamburger from 'hamburger-react'
import Mobilepagenavbar from './navbarForMobile.js'
import Register from '../../RegisterPopUp/RegisterPopUp.js'
import Login from "../../LoginPopUP/LoginPopUp.js"


const Navbar = () => {
  //usestate for Humberger icon
  const [IsHamburgerClicked, setIsHamburgerClicked] = useState(false);
  // usestate for registration button
  const [IsRegisterClicked, setRegisterClicked] = useState(false)
  // usestate for Sign button
  const [IsSignInClicked, setSignInClicked] = useState(false)
  const [isOpen, setOpen] = useState(false)

  //checking if username available in sessionStorage;
  const Is_UserName_saved = sessionStorage.getItem("username");
  if (Is_UserName_saved) {
    console.log('Is_UserName_saved- ', Is_UserName_saved);
  }

  function ClickHamburger() {
    setIsHamburgerClicked(() => !IsHamburgerClicked)
  }

  // register button
  function registerButton() {
    //setting true to show the registerpop-up when i click it.
    setRegisterClicked((pre) => true)
  }

  //Sign button
  function SignInButton() {
    //setting true to show the loginin up when i click it.
    setSignInClicked((pre) => {
      return true
    })
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
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>
      {/* when i click the Hamburger register and login options will show.(for small screen) */}
      {IsHamburgerClicked && <Mobilepagenavbar />}
      {/* when i click the register button a register popUp will show */}
      {IsRegisterClicked && <Register setRegisterClicked={setRegisterClicked} />}
      {/* when i click the login/signin button a login  popUp will show */}
      {IsSignInClicked && <Login setSignInClicked={setSignInClicked} />}
    </div>
  )
}

export default Navbar