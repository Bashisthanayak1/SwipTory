import React, { useState } from 'react'
import Hamburger from 'hamburger-react'
import Mobilepagenavbar from './navbarForMobile.js'

const Navbar = () => {

  const [IsHamburgerClicked, setIsHamburgerClicked] = useState(false);
  function ClickHamburger() {
    setIsHamburgerClicked(() => !IsHamburgerClicked)
  }

  return (
    <div className='navbar--container'>
      <nav className='navbar'>
        <h2>SwipTory</h2>
        <div>
          <button>Register Now</button>
          <button>Sign In</button>
        </div>
      </nav>

      <div className="Hamburger" onClick={ClickHamburger}>
        <Hamburger ></Hamburger>
      </div>

      {IsHamburgerClicked ? <Mobilepagenavbar /> : ""}


    </div>
  )
}

export default Navbar