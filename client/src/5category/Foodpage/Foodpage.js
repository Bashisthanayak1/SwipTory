
import React, { useEffect, useState } from 'react';
import '../Foodpage/FoodPage.css';
import axios from 'axios';
import AutoSlider from '../AutoSlider/AutoSlider';

const Foodpage = () => {
    const [foodArray, setFoodArray] = useState([]);
    const [showMoreClicked, setShowMoreClicked] = useState(false);
    const [IsSliderDivClicked, setIsSliderDivClicked] = useState(false);
    //slicing main array for get only 3 objects according to the clicking box index
    const [slicedArray, setSlicedArray] = useState([]);


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
        setSlicedArray(SLCAR);
        setIsSliderDivClicked(true)
    }

    return (
        <>
            <div className='Food--page--container' style={{ overflow: showMoreClicked ? 'visible' : 'hidden', height: showMoreClicked ? 'auto' : '500px' }}>
                <h1 className='About--food--h1'>Top Stories About food</h1>
                {!foodArray.length >= 3 && <h3>No stories Available</h3>}

                {foodArray.length >= 4 &&
                    divTOprint()
                }
            </div>
            {foodArray.length >= 4 && <button onClick={clickShowMore} className='showmore--button'>{showMoreClicked ? "hide" : "Show more..."}</button>}
            {IsSliderDivClicked && <AutoSlider slicedArray={slicedArray} setIsSliderDivClicked={setIsSliderDivClicked} />}

        </>
    );
};

export default Foodpage;
