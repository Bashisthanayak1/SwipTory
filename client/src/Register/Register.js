import React, { useState } from 'react'

const Register = (props) => {
    const [closeRegister, setCloseRegister] = useState(true)

    function CrossSign() {
        console.log('clicked x');
        setCloseRegister(() => false)
        props.setRegisterClicked(() => false)
    }


    return (

        <>
            {closeRegister &&
                <div className='register--divs--container'>
                    <div className='register--div' >
                        <div className='Cross--for--close' onClick={CrossSign}>x</div>
                        <h2 className='RegisterBox--name'>Register to Swip Tory</h2>
                        <form action="">
                            <label htmlFor="">Username</label>
                            <input type="text" placeholder='Username' />
                            <br />
                            <label htmlFor="">Password</label>
                            <input type="text" placeholder='Password' />
                            <br />
                            <input type="submit" value="register" id='PopUp--register--Button' />
                        </form>
                    </div >
                </div >}

        </>

    )
}

export default Register