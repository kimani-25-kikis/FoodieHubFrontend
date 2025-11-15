import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HomeHero from '../components/home/HomeHero'
import WhatYouWillGet from '../components/home/WhatYouWillGet'
import OurTopChoiceMeal from '../components/home/OurTopChoiceMeal'
import CustomerReviews from '../components/home/CustomerReviews'

const Home: React.FC = () => {
    return (
        <div className="page-container">
            <Navbar />
            <HomeHero />
            <WhatYouWillGet />
            <OurTopChoiceMeal />
            <CustomerReviews />
            <Footer />
        </div>
    )
}

export default Home