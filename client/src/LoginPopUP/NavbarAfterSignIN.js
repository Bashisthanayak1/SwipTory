import React, { useState } from 'react'
import Hamburger from 'hamburger-react'

const NavbarAfterSignIN = (props) => {
    const [shouldShowInfo, setshouldShowInfo] = useState(false)
    //addstory popUp state
    const [openAddStory, setOpenAddStory] = useState(true)
    //defining state of an array
    const [slideToPrint, setSlideToPrint] = useState(0)

    function ClkForInfoAndLogout() {
        setshouldShowInfo((pre) => !pre)
    }

    //logout
    function ClickLogout() {
        console.log('clicking logout');
        sessionStorage.clear("username")
        props.setnamesaves(false)
    }
    //function to addstory click
    function ClickAddStory() {
        console.log('ADdbutton-clicked');
        setOpenAddStory((pre) => !pre)
    }
    //x - for closing add story popup
    function AddStoryX() {
        //closing addstory popup when click X.
        setOpenAddStory((pre) => !pre)
        setSlideToPrint(() => 0)
    }
    //function runs when we click Add+ button

    function AddStory() {
        setSlideToPrint((pre) => (++pre))
        console.log(slideToPrint);
    }
    //x of slide button
    function slideButtonCross() {
        // setSlideToPrint((pre) => (pre - 1))
    }

    return (
        <div className='AfterSignIN--div'>
            <button className='Bookmarks--button'><i class="fa-solid fa-bookmark"></i> Bookmarks</button>
            <button id='Addstory--button' onClick={ClickAddStory}>Add story</button>
            <img className='user__profile_photo' src="https://media.istockphoto.com/id/1268548918/vector/white-create-account-screen-icon-isolated-with-long-shadow-red-circle-button-vector.jpg?s=612x612&w=0&k=20&c=tyaWWtW2_yQyvK4hBnVXEt3tfSNr0jVC_6P7XbOBrbk=" alt="" />

            <div onClick={ClkForInfoAndLogout}>
                <Hamburger toggled={false} toggle={false} size={22} />
            </div>

            {shouldShowInfo && <div className='Info--Logout'>
                <img className='user__profile_photo_smallSCR' src="https://media.istockphoto.com/id/1268548918/vector/white-create-account-screen-icon-isolated-with-long-shadow-red-circle-button-vector.jpg?s=612x612&w=0&k=20&c=tyaWWtW2_yQyvK4hBnVXEt3tfSNr0jVC_6P7XbOBrbk=" alt="" />
                <h4>{props.username}</h4>
                <button type="button" className='Three_hidden_button' >Your Story</button>
                <button type="button" className='Three_hidden_button'><i class="fa-solid fa-bookmark"></i> Bookmarks</button>
                <button type="button" className='Three_hidden_button' onClick={ClickAddStory}>Add story</button>
                <button type="button" id='Logout--button' onClick={ClickLogout}>Logout</button>
            </div>
            }
            {/* addstory div */}
            {openAddStory &&
                <div className='Add--story--container' >
                    <div className='add--story--div'>
                        <h1 className='add--story--div__cross' onClick={AddStoryX}>x</h1>
                        <div className='slide--button--container'>
                            <button>slide 1</button>
                            <button>slide 2</button>
                            <button>slide 3</button>
                            {(() => {
                                let elements = [];
                                for (let i = 0; i < slideToPrint; i++) {
                                    elements.push(
                                        <button className='A--New--Slide' >
                                            <span onClick={slideButtonCross}>x</span>
                                            slide {i + 4}
                                        </button>);
                                }
                                return elements;
                            })()}
                            <button onClick={AddStory} disabled={(slideToPrint === 3) ? true : false} style={{ cursor: (slideToPrint === 3) ? 'not-allowed' : "pointer" }}>Add+</button>

                        </div>
                        <div className='label--inputs--div'><label htmlFor="">Heading : </label>
                            <input type="text" placeholder='Your heading' id='Heading--input' />
                            <br />
                            <label htmlFor="" >Description : </label>
                            <input type="text" placeholder='Story Description' />
                            <br />
                            <label htmlFor="">Image URL : </label>
                            <input type="text" placeholder='Add Image URL' />
                            <br />
                            <label htmlFor="">Category : </label>
                            <select>
                                <option value="" disabled>Select category</option>
                                <option value="" >food</option>
                                <option value="" >health and fitness</option>
                                <option value="" >travel</option>
                                <option value="" >movie</option>
                                <option value="" >education</option>
                            </select></div>
                        <br />
                        <div id='PRV--NXT--POST--Div'>
                            <button>Previous</button>
                            <button>Next</button>
                            <button>post</button>
                        </div>

                    </div>
                </div>}
        </div>
    )
}

export default NavbarAfterSignIN