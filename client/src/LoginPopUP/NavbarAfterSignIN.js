import React, { useState } from 'react'
import Hamburger from 'hamburger-react'

const NavbarAfterSignIN = (props) => {
    const [shouldShowInfo, setshouldShowInfo] = useState(false)
    //addstory popUp state
    const [openAddStory, setOpenAddStory] = useState(true)
    //defining state of an array
    const [slideToPrint, setSlideToPrint] = useState([1, 1, 1])
    //adding divs border-color if it is clicked
    const [SlideIsClicked, setSlideIsClicked] = useState(null)


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
        setSlideToPrint((pre) => [1, 1, 1])
    }
    //function runs when we click Add+ button

    function AddStorySlideButton() {
        setTimeout(() => {
            setSlideToPrint((prev) => [...prev, 1])
        }, 100)
    }
    //x of slide button
    // function slideButtonCross(i) {
    //     // console.log("before splice -", slideToPrint);
    //     // console.log("index-", i);
    //     // const modifyedArray = slideToPrint.splice(i, 1);
    //     // console.log("after splice-", modifyedArray);
    //     setSlideToPrint((pre) => {
    //         return (pre.splice(i, 1))
    //     })
    // }

    // function slideButtonCross(i) {
    //     setSlideToPrint((prev) => {
    //         const modifiedArray = [...prev];
    //         modifiedArray.splice(i, 1);
    //         return modifiedArray;
    //     });
    // }


    function slideButtonCross(i) {
        if (slideToPrint.length > 3) {
            setTimeout(() => {
                setSlideToPrint((prev) => prev.filter((_, index) => index !== i));
            }, 500)
        }
    }

    // modifying state if slide is clicked -for adding its border color
    function Onclick__function_ForA_slide(i) {
        console.log(i);
        setSlideIsClicked(i)
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

                            {slideToPrint.length > 0 && (() => {
                                let elements = [];
                                for (let i = 0; i < slideToPrint.length; i++) {
                                    elements.push(
                                        <button onClick={() => Onclick__function_ForA_slide(i)} className={`A--New--Slide  ${SlideIsClicked === i ? 'clicked' : ''}`} key={i}>
                                            {slideToPrint.length > 3 && <span onClick={() => slideButtonCross(i)}>x</span>}

                                            slide {i + 1}
                                        </button>)
                                }
                                return elements;
                            })()}
                            {/* disabled={(slideToPrint.length === 3) ? true : false} style={{ cursor: (slideToPrint.length === 3) ? 'not-allowed' : "pointer" }} */}
                            <button onClick={AddStorySlideButton} disabled={(slideToPrint.length === 6) ? true : false} style={{ cursor: (slideToPrint.length === 6) ? 'not-allowed' : "pointer" }} >Add+</button>

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