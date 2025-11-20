import React from 'react'
import homehero from '../../assets/FoodieHub.png';

const HomeHero: React.FC = () => {
    return (
        // Main hero container with appropriate height and background
        <div className="flex items-center bg-gradient-to-br from-rose-50 to-orange-50 px-5 py-16 md:py-20">
            <div className="flex flex-col lg:flex-row-reverse items-center max-w-6xl mx-auto gap-6">
                {/* Hero Image */}
                <div className="flex-1">
                    <img
                        src={homehero}
                        alt="Restaurant Hero"
                        className="w-full h-80 md:h-96 object-cover rounded-xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                    />
                </div>

                {/* Hero Content */}
                <div className="flex-1 text-center lg:text-left">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-rose-900 mb-5 leading-tight">
                        Delicious Dining Experience!
                    </h1>
                    <p className="text-lg md:text-xl text-rose-700 mb-6 leading-relaxed">
                        Discover amazing flavors and culinary masterpieces crafted with passion.
                        Experience the finest dining with fresh ingredients and exceptional service.
                    </p>
                    <button className="bg-gradient-to-r from-rose-700 to-orange-600 hover:from-rose-800 hover:to-orange-700 text-white px-8 py-4 text-lg font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                        Explore Meals
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomeHero