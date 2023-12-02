
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import '../Foodpage/FoodPage.css';
import axios from 'axios';

const Foodpage = () => {
    let Navigate = useNavigate();
    const [foodArray, setFoodArray] = useState([]);
    const [showMoreClicked, setShowMoreClicked] = useState(false);

    useEffect(() => {
        async function foodFunction() {
            try {
                const foodData = await axios.get(`http://localhost:8000/CategoryData?Acategory=food`);
                console.log('foodData ', foodData.data.categorydata);
                setFoodArray(foodData.data.categorydata);
            } catch (error) {
                console.error(error);
            }
        }
        foodFunction();
    }, []);


    let arr = [];
    function divTOprint() {
        for (let i = 0; i < (foodArray.length / 3); i++) {
            arr.push(
                <div className='DIv--OfA--slide' key={i} onClick={() => ClkSlideDIV(i)}>
                    <img src={foodArray[i].Add_Image_URL} alt="img" />
                    <h3>{foodArray[i].Your_heading}</h3>
                    <h2>{foodArray[i].Story_Description}</h2>
                </div>)
        }
        return arr;
    }

    function clickShowMore() {
        setShowMoreClicked((prev) => !prev);
    }


    //when we click slide div to open slider 
    function ClkSlideDIV(i) {
        console.log('sliderdiv clicked');
        console.log(i);
        let SLCAR = [];
        console.log('foodArray lengt:- ', foodArray.length);
        SLCAR = foodArray.slice(i * 3, (i * 3) + 3);
        console.log("SLCAR array - ", SLCAR);

        // Convert the array to a string for the URL
        const slicedArrayString = encodeURIComponent(JSON.stringify(SLCAR));
        // Navigate to AutoSlider with query parameter
        Navigate(`/AutoSlider?slicedArray=${slicedArrayString}`);
    }

    return (
        <>
            <div className='Food--page--container' style={{ overflow: showMoreClicked ? 'visible' : 'hidden', height: showMoreClicked ? 'auto' : '500px' }}>
                <h1 className='About--food--h1'>Top Stories About food</h1>
                {(!foodArray.length >= 1) && <h3>No stories Available</h3>}

                {foodArray.length >= 3 &&
                    divTOprint()
                }
            </div>
            {foodArray.length >= 4 && <button onClick={clickShowMore} className='showmore--button'>{showMoreClicked ? "hide" : "Show more..."}</button>}

        </>
    );
};

export default Foodpage;
