import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="bg-rose-50 text-center py-20 px-8 shadow-md">
  <h1 className="text-4xl md:text-5xl font-bold text-rose-700 mb-6">
    🍽️ About FoodieHub
  </h1>

  <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 leading-relaxed">
    Where passion meets flavor, celebrating food, culture, and unforgettable dining experiences. Here we ensure you met your taste and the memories will never fade
  </p>
</section>


      {/* OUR STORY */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <h2 className="text-4xl font-bold text-rose-700 mb-6">📖 Our Story</h2>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Founded in 2018, Mathe’s Eatery began as a humble family kitchen filled with love, laughter, 
              and timeless recipes. What started as Grandmother Mathe’s treasured dishes shared among friends 
              has grown into a warm and vibrant dining experience cherished by the community.
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed">
              Today, we continue her legacy by blending tradition with creativity — creating meals that bring 
              people together, spark joy, and turn everyday moments into stories worth remembering.
            </p>
          </div>

          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80"
              alt="Restaurant Interior"
              className="w-full max-w-lg rounded-2xl shadow-2xl object-cover"
            />
          </div>

        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 px-8 bg-rose-50">
        <div className="max-w-6xl mx-auto text-center">
          
          <h2 className="text-4xl font-bold text-rose-700 mb-4">✨ Our Values</h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-12">
            These principles inspire everything we create — from our kitchen to your table.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: '🌱',
                title: 'Fresh & Local',
                description:
                  'We proudly support local farmers and ensure every ingredient is fresh, flavorful, and sustainable.'
              },
              {
                icon: '❤️',
                title: 'Made with Love',
                description:
                  'Every dish is prepared with care, passion, and a dedication to creating memorable meals.'
              },
              {
                icon: '🤝',
                title: 'Community',
                description:
                  'We are committed to serving and growing with our community by fostering warmth and connection.'
              }
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition-transform"
              >
                <div className="text-6xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-rose-700 mb-3">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* TEAM */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          
          <h2 className="text-4xl font-bold text-rose-700 mb-4">👥 Meet Our Team</h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-12">
            The passionate individuals who bring magic to every dish.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                name: 'Chef Mathe Lucy',
                role: 'Head Chef & Founder',
                image:
                  'https://images.unsplash.com/photo-1556911073-52527ac43761?auto=format&fit=crop&w=800&q=80',
                description:
                  'A culinary visionary who blends tradition and innovation to craft unforgettable flavors.'
              },
              {
                name: 'Chef Mathe Jane',
                role: 'Pastry Chef',
                image:
                  'https://plus.unsplash.com/premium_photo-1661768360749-b60196445a6d?auto=format&fit=crop&w=800&q=80',
                description:
                  'Creates heavenly pastries and desserts that complete every dining experience.'
              },
              {
                name: 'Chef Mathe Nancy',
                role: 'Restaurant Manager',
                image:
                  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
                description:
                  'Ensures seamless experiences and warm welcomes for every guest who walks through our doors.'
              },
              {
                name: 'Chef Amara',
                role: 'Sous Chef',
                image:
                  'https://images.unsplash.com/photo-1625631980683-825234bfb7d5?auto=format&fit=crop&w=800&q=80',
                description:
                  'Brings creative flair and fusion concepts that elevate our signature dishes.'
              }
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:-translate-y-2 transition-transform"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-rose-700 mb-1">{member.name}</h3>
                  <p className="text-orange-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-700 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FUN FACTS */}
      <section className="py-20 px-8 bg-rose-50">
        <div className="max-w-6xl mx-auto text-center">
          
          <h2 className="text-4xl font-bold text-rose-700 mb-10">🎉 Fun Facts About Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { number: '50,000+', label: 'Happy Customers' },
              { number: '150+', label: 'Unique Recipes' },
              { number: '⭐ 4.9', label: 'Average Rating' },
              { number: '24/7', label: 'Food Passion' }
            ].map((fact, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-xl"
              >
                <div className="text-4xl font-extrabold text-rose-700 mb-2">{fact.number}</div>
                <p className="text-gray-700 font-medium text-lg">{fact.label}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 px-8 bg-rose-50 text-center">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-4xl font-bold text-rose-700 mb-4">
      🌟 Ready to Experience the Magic?
    </h2>

    <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed">
      Whether you're here for a quick bite or a special celebration, we promise 
      unforgettable flavors and heartfelt hospitality.
    </p>

    <div className="flex justify-center gap-6 flex-wrap">

      {/* Primary Button */}
      <button className="px-8 py-4 bg-rose-700 text-white rounded-full font-bold text-lg shadow hover:bg-rose-800 hover:-translate-y-1 hover:shadow-xl transition">
        🍽️ View Menu
      </button>

      {/* Outline Button */}
      <button className="px-8 py-4 border-2 border-rose-700 text-rose-700 rounded-full font-bold text-lg hover:bg-rose-700 hover:text-white transition hover:-translate-y-1">
        📞 Contact Us
      </button>

    </div>
  </div>
</section>


      <Footer />
    </div>
  )
}

export default About
