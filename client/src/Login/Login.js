import React, { useState } from 'react'

const Login = (props) => {
    //useStates
    const [closeLogin, setCloseLogin] = useState(true)
    const [userDetails, setuserDetails] = useState({
        username: "",
        password: "",
    })

    //function runs when we click cross sign
    function CrossSign() {
        console.log('clicked x');
        setCloseLogin(() => false)
        props.setSignInClicked(() => false)
    }

    //function runs when we input 
    function updatingInputValues(event) {
        const { name, value } = event.target
        setuserDetails((pre) => {
            return { ...pre, [name]: value }
        })
    }

    return (

        <>
            {closeLogin &&
                <div className='register--divs--container'>
                    <div className='register--div' >
                        <div className='Cross--for--close' onClick={CrossSign}>x</div>
                        <h2 className='RegisterBox--name'>Login to Swip Tory</h2>

                        <form action="/" method='POST'>
                            <label htmlFor="">Username</label>
                            <input type="text" placeholder='Username' name='username' value={userDetails.username} onChange={updatingInputValues} />
                            <br />
                            <label htmlFor="">Password</label>
                            <input type="password" placeholder='Password' name='password' value={userDetails.password} onChange={updatingInputValues} />
                            <br />
                            <input type="submit" value="login" id='PopUp--register--Button' />
                        </form>
                    </div >
                </div >}

        </>

    )
}

export default Login