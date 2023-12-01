import React from 'react'
import Navbar from './PagesJS/Navbar/navbar'
import Stories from './PagesJS/Stories/stories'
import FoodPage from "./5category/Foodpage/Foodpage.js"
// import HealthFitness from './5category/healthFitnesspage/HealthFitness.js'

const homepage = () => {
    return (
        <div>
            <Navbar />
            <Stories />
            <FoodPage />
            {/* <HealthFitness /> */}
        </div>
    )
}

export default homepage