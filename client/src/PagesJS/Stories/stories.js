import React, { useState } from 'react'
import categoriesData from './categoriesData'

const Stories = () => {
    const [clickedIndex, setClickedIndex] = useState(null);

    function clickOnAnyCategory(i) {
        console.log(i);
        setClickedIndex(i);

    }

    return (
        <div className='categories--container'>
            {categoriesData.map((v, i) =>
                <div className={`categoryDiv ${clickedIndex === i ? 'clicked' : ''}`} key={i} onClick={() => clickOnAnyCategory(i)} >
                    <h1>{v.Name}</h1>
                    <img src={v.Image} alt={v.Name} />
                </div>)}
        </div>
    )
}

export default Stories