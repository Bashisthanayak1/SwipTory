import React, { useEffect, useState } from 'react';
// import "../healthFitnesspage/HealthFitness.css"
import '../Foodpage/FoodPage.css';

import axios from 'axios';

const HealthFitness = () => {
    const [foodArray, setFoodArray] = useState([]);
    const [showMoreClicked, setShowMoreClicked] = useState(false);

    useEffect(() => {
        async function foodFunction() {
            try {
                const foodData = await axios.get(`http://localhost:8000/CategoryData?Acategory=health and fitness`);
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
                <div className='DIv--forA--slide' key={i}>
                    <img src="https://m.media-amazon.com/images/I/414Djxa2GmL.jpg" alt="img" />
                </div>)
        }
        return arr;
    }

    function clickShowMore() {
        setShowMoreClicked((prev) => !prev);
    }

    return (
        <>
            <div className='Food--page--container' style={{ overflow: showMoreClicked ? 'visible' : 'hidden', height: showMoreClicked ? 'auto' : '500px' }}>
                <h1 className='About--food--h1'>Top Stories About health and fitness</h1>
                {!foodArray.length >= 3 && <h3>No stories Available</h3>}

                {foodArray.length >= 4 &&
                    divTOprint()
                }
            </div>
            {foodArray.length >= 4 && <button onClick={clickShowMore} className='showmore--button'>{showMoreClicked ? "hide" : "Show more"}</button>}

        </>
    );
};

export default HealthFitness;
