import React, { useState } from 'react'
import Hamburger from 'hamburger-react'
import Mobilepagenavbar from './navbarForMobile.js'
import Register from '../../Register/Register.js'

const Navbar = () => {
  //usestate for Humberger icon
  const [IsHamburgerClicked, setIsHamburgerClicked] = useState(false);
  // usestate for registration button
  const [IsRegisterClicked, setRegisterClicked] = useState(false)

  function ClickHamburger() {
    setIsHamburgerClicked(() => !IsHamburgerClicked)
  }

  function registerButton() {
    setRegisterClicked((pre) => !pre)
  }

  return (
    <div className='navbar--container'>
      <nav className='navbar'>
        <h2>SwipTory</h2>
        <div>
          <button onClick={registerButton}>Register Now</button>
          <button>Sign In</button>
        </div>
      </nav>

      <div className="Hamburger" onClick={ClickHamburger}>
        <Hamburger ></Hamburger>
      </div>

      {IsHamburgerClicked && <Mobilepagenavbar />}
      {IsRegisterClicked && <Register setRegisterClicked={setRegisterClicked}/>}

    </div>
  )
}

export default Navbar