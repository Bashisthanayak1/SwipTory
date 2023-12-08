import React from 'react'
import Navbar from './PagesJS/Navbar/navbar'
import Stories from './PagesJS/Stories/stories'
import FoodPage from "./Fivecategories/Foodpage/Foodpage.js"
import Healthpage from './Fivecategories/healthFitnesspage/HealthFitness.js'
import Travelpage from './Fivecategories/travelpage/TravelPage.js'
import Moviepage from './Fivecategories/moviepage/Moviepage.js'
import Educationpage from './Fivecategories/educationPage/Educationpage.js'

const homepage = () => {
    return (
        <div>
            <Navbar />
            <Stories />
            <FoodPage />
            <Healthpage />
            <Travelpage />
            < Moviepage />
            <Educationpage />
        </div>
    )
}

export default homepage