import React, { useState, useEffect } from 'react'

interface Review {
    id: number
    name: string
    image: string
    rating: number
    comment: string
    location: string
}

const CustomerReviews: React.FC = () => {
    const [currentReview, setCurrentReview] = useState(0)

    const reviews: Review[] = [
        {
            id: 1,
            name: "Jona",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
            rating: 5,
            comment: "Absolutely amazing! The pasta was incredible and the service was top-notch. Can't wait to come back! 😍",
            location: "Kenya"
        },
        {
            id: 2,
            name: "Simon",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            rating: 5,
            comment: "Best restaurant experience ever! The flavors were out of this world. Highly recommend! 🌟",
            location: "Kenya"
        },
        {
            id: 3,
            name: "Jane",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
            rating: 5,
            comment: "Perfect date night spot! Romantic atmosphere and delicious food. Thank you Mathe's! 💕",
            location: "Kenya"
        },
        {
            id: 4,
            name: "David",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            rating: 5,
            comment: "Outstanding quality and presentation. The chef really knows what they're doing! 👨‍🍳",
            location: "Kenya"
        }
    ]

    // Auto-rotate reviews every 4 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentReview((prev) => (prev + 1) % reviews.length)
        }, 4000)

        return () => clearInterval(timer)
    }, [reviews.length])

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <span
                key={index}
                className={`text-2xl ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            >
                ⭐
            </span>
        ))
    }

    return (
        <div className="py-16 px-8 bg-gradient-to-br from-rose-50 to-orange-50">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-rose-900 mb-4">
                        🌟 What Our Customers Say
                    </h2>
                    <p className="text-xl text-rose-700">
                        Don't just take our word for it - hear from our amazing customers!
                    </p>
                </div>

                {/* Main Review Display */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 transform hover:scale-105 transition-all duration-300 border border-rose-200">
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                        {/* Customer Image */}
                        <div className="shrink-0">
                            <img
                                src={reviews[currentReview].image}
                                alt={reviews[currentReview].name}
                                className="w-24 h-24 rounded-full border-4 border-rose-200 shadow-lg"
                            />
                        </div>

                        {/* Review Content */}
                        <div className="text-center lg:text-left flex-1">
                            <div className="flex justify-center lg:justify-start mb-3">
                                {renderStars(reviews[currentReview].rating)}
                            </div>

                            <blockquote className="text-xl text-rose-800 mb-4 italic leading-relaxed">
                                "{reviews[currentReview].comment}"
                            </blockquote>

                            <div className="font-bold text-lg text-rose-900">
                                {reviews[currentReview].name}
                            </div>
                            <div className="text-rose-600">
                                📍 {reviews[currentReview].location}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Review Navigation Dots */}
                <div className="flex justify-center gap-3">
                    {reviews.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentReview(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentReview
                                ? 'bg-rose-600 scale-125'
                                : 'bg-rose-300 hover:bg-rose-400'
                                }`}
                            aria-label={`View review ${index + 1}`}
                        />
                    ))}
                </div>

                {/* All Reviews Preview */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reviews.map((review, index) => (
                        <div
                            key={review.id}
                            onClick={() => setCurrentReview(index)}
                            className={`bg-white p-6 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-rose-200 ${index === currentReview ? 'ring-2 ring-rose-400 scale-105' : ''
                                }`}
                        >
                            <div className="text-center">
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-rose-200"
                                />
                                <div className="flex justify-center mb-2">
                                    {renderStars(review.rating)}
                                </div>
                                <h4 className="font-bold text-rose-900 mb-1">{review.name}</h4>
                                <p className="text-sm text-rose-600">{review.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CustomerReviews