import React, { useState } from 'react'
import categoriesData from './categoriesData'
import axios from 'axios';

const Stories = () => {
    const [clickedIndex, setClickedIndex] = useState(null);

    async function clickOnAnyCategory(categoryName) {
        console.log(categoryName);
        setClickedIndex(categoryName);
        try {
            const categoryData = await axios.get(`http://localhost:8000/CategoryData?Acategory=${categoryName}`)
            //printing the data that commin gin array format
            console.log(categoryData.data.categorydata);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='categories--container'>
            {categoriesData.map((v, i) =>
                <div className={`categoryDiv ${clickedIndex === i ? 'clicked' : ''}`} key={i} onClick={() => clickOnAnyCategory(v.Name)} >
                    <h1>{v.Name}</h1>
                    <img src={v.Image} alt={v.Name} />
                </div>)}
        </div>
    )
}

export default Stories