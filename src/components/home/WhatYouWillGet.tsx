import React from 'react'

const WhatYouWillGet: React.FC = () => {
    return (
        <section className="py-20 px-5 bg-gray-50">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-15">
                    What you'll get at Mathe's EATERY
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                    <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="text-5xl mb-5 bg-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg">
                            🍽️
                        </div>
                        <h3 className="text-xl md:text-2xl font-semibold text-green-800 mb-4">Authentic dishes</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Each meal is prepared with traditional recipes and fresh, locally-sourced ingredients.
                        </p>
                    </div>

                    <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="text-5xl mb-5 bg-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg">
                            ⚡
                        </div>
                        <h3 className="text-xl md:text-2xl font-semibold text-green-800 mb-4">Quick service</h3>
                        <p className="text-gray-600 leading-relaxed">
                            All orders are designed to be served quickly without compromising on quality and taste.
                        </p>
                    </div>

                    <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="text-5xl mb-5 bg-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg">
                            🔍
                        </div>
                        <h3 className="text-xl md:text-2xl font-semibold text-green-800 mb-4">Easy ordering</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Browse our menu and place your order in seconds with our simple and intuitive system.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhatYouWillGet;