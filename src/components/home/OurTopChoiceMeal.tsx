import React from 'react'

interface OurTopChoiceMeal {
    menu_item_id: number;
    name: string;
    description: string;
    category_name?: string;
    price: number;
    menuitemimage_url: string;
    is_available: boolean;
}

const OurTopChoiceMeals: OurTopChoiceMeal[] = [
    {
        menu_item_id: 1,
        name: 'Grilled Chicken Salad',
        description: 'A healthy mix of grilled chicken, fresh greens, and a light vinaigrette.',
        price: 12.99,
        category_name: 'Salads',
        menuitemimage_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        is_available: true,
    },
    {
        menu_item_id: 2,
        name: 'Spaghetti Carbonara',
        description: 'Classic Italian pasta with creamy sauce, pancetta, and Parmesan cheese.',
        price: 14.99,
        category_name: 'Pasta',
        menuitemimage_url: 'https://images.unsplash.com/photo-1623243020684-9f8bcefe6e94?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470',
        is_available: true,
    },
    {
        menu_item_id: 3,
        name: 'Vegan Buddha Bowl',
        description: 'A nourishing bowl of quinoa, roasted veggies, chickpeas, and tahini dressing.',
        price: 11.99,
        category_name: 'Vegan',
        menuitemimage_url: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        is_available: true,
    }
]

const OurTopChoiceMeal: React.FC = () => {
    return (
        <section className="py-20 px-5 bg-white">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Our Top Choice Meals</h2>
                <p className="text-lg text-gray-600 mb-15 max-w-2xl mx-auto leading-relaxed">
                    Discover our most loved dishes, carefully crafted with fresh ingredients and authentic flavors
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                    {OurTopChoiceMeals.map((meal) => (
                        <div key={meal.menu_item_id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={meal.menuitemimage_url}
                                    alt={meal.name}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-4 left-4 bg-green-800 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                                    {meal.category_name}
                                </div>
                            </div>

                            <div className="p-6 text-left">
                                <h3 className="text-xl font-semibold text-green-800 mb-3">{meal.name}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-6 h-16 overflow-hidden">
                                    {meal.description}
                                </p>

                                <div className="flex justify-between items-center">
                                    <div className="text-2xl font-bold text-green-800">${meal.price}</div>
                                    <button className="bg-green-800 hover:bg-green-900 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                        Order Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default OurTopChoiceMeal