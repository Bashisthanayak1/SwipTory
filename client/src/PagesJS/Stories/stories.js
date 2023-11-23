import React from 'react'
import categoriesData from './categoriesData'

const stories = () => {
    return (
        <div className='categories--container'>
            {categoriesData.map((v, i) =>
                <div className='categoryDiv' >
                    <h1>{v.Name}</h1>
                    <img src={v.Image} alt={v.Name} />
                </div>)}
        </div>
    )
}

export default stories