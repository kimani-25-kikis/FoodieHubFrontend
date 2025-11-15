import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface ContactFormData {
    name: string
    email: string
    phone: string
    subject: string
    message: string
}

const Contact: React.FC = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        setTimeout(() => {
            alert(`Thank you ${formData.name}! We’ll get back to you shortly.`)
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            })
            setIsSubmitting(false)
        }, 2000)
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />

            {/* HERO */}
            <div className="bg-white text-center py-20 px-8 shadow-sm">
  <h1 className="text-4xl md:text-6xl font-bold text-rose-700 mb-4">
    📞 Get in Touch
  </h1>

  <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
    Whether you have questions, feedback, or want to make a reservation — 
    we’re here to help you anytime.
  </p>
</div>


            {/* CONTACT INFO CARDS */}
            <div className="py-16 px-8 bg-rose-50">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        {
                            icon: '📍',
                            title: 'Visit Us',
                            info: 'G-Town',
                            detail: 'G-Town, Embu 60100',
                            action: 'Get Directions'
                        },
                        {
                            icon: '📞',
                            title: 'Call Us',
                            info: '+254 712 345 678',
                            detail: '+254 700 987 654',
                            action: 'Call Now'
                        },
                        {
                            icon: '🕒',
                            title: 'Opening Hours',
                            info: 'Mon - Sun: 8:00 AM',
                            detail: 'to 10:00 PM',
                            action: 'View Schedule'
                        }
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-8 rounded-3xl shadow-xl text-center hover:-translate-y-2 transition-transform"
                        >
                            <div className="text-3xl mb-4">{item.icon}</div>

                            <h3 className="text-xl font-bold text-rose-700 mb-2">{item.title}</h3>

                            <p className="text-lg font-semibold text-gray-800">{item.info}</p>
                            <p className="text-gray-600 mb-6">{item.detail}</p>

                            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-700 to-orange-500 text-white font-semibold hover:opacity-90 transition">
                                {item.action}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* FORM + RIGHT SIDEBAR INFO */}
            <div className="py-20 px-8 bg-white">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* FORM */}
                    <div>
                        <h2 className="text-4xl font-bold text-rose-700 mb-4">
                            💬 Send Us a Message
                        </h2>
                        <p className="text-gray-700 text-lg mb-8">
                            Need assistance? We'd love to hear from you.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                            {/* Name + Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="font-semibold text-gray-700 mb-2 block">Full Name *</label>
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-700 outline-none"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="font-semibold text-gray-700 mb-2 block">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 outline-none"
                                        placeholder="Your email"
                                    />
                                </div>
                            </div>

                            {/* Phone + Subject */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="font-semibold text-gray-700 mb-2 block">Phone</label>
                                    <input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 outline-none"
                                        placeholder="Optional"
                                    />
                                </div>

                                <div>
                                    <label className="font-semibold text-gray-700 mb-2 block">Subject *</label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-700 outline-none bg-white"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="reservation">🍽️ Reservation</option>
                                        <option value="feedback">💬 Feedback</option>
                                        <option value="complaint">⚠️ Complaint</option>
                                        <option value="catering">🎉 Catering</option>
                                        <option value="careers">💼 Careers</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            {/* MESSAGE */}
                            <div>
                                <label className="font-semibold text-gray-700 mb-2 block">Message *</label>
                                <textarea
                                    name="message"
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-700 outline-none"
                                    placeholder="Write your message..."
                                />
                            </div>

                            {/* SUBMIT */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-8 py-4 rounded-xl text-lg font-bold text-white transition ${
                                    isSubmitting
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-gradient-to-r from-rose-700 to-orange-500 hover:opacity-90"
                                }`}
                            >
                                {isSubmitting ? "⏳ Sending..." : "📤 Send Message"}
                            </button>
                        </form>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div>

                        {/* MAP */}
                        <h3 className="text-3xl font-bold text-rose-700 mb-4">🗺️ Find Us</h3>
                        <div className="w-full h-64 bg-rose-100 border border-rose-200 rounded-2xl flex items-center justify-center shadow-inner mb-10">
                            <div className="text-center text-rose-700">
                                <div className="text-4xl mb-2">📍</div>
                                <p className="text-lg font-semibold">Interactive Map</p>
                                <p className="text-sm">123 Delicious Street, Nairobi</p>
                            </div>
                        </div>

                        {/* HOURS */}
                        <div className="bg-rose-50 border border-rose-200 p-8 rounded-2xl mb-10">
                            <h4 className="text-xl font-bold text-rose-700 mb-4">🕒 Business Hours</h4>

                            {[
                                { day: 'Mon - Thu', hours: '8:00 AM - 9:00 PM' },
                                { day: 'Fri - Sat', hours: '8:00 AM - 10:00 PM' },
                                { day: 'Sunday', hours: '9:00 AM - 9:00 PM' }
                            ].map((item, idx) => (
                                <div key={idx} className="flex justify-between py-3 border-b last:border-none border-rose-200">
                                    <span className="text-gray-700 font-medium">{item.day}</span>
                                    <span className="text-rose-700 font-semibold">{item.hours}</span>
                                </div>
                            ))}
                        </div>

                        {/* SOCIALS */}
                        <div className="bg-white border border-rose-200 p-8 rounded-2xl">
                            <h4 className="text-xl font-bold text-rose-700 mb-4">📱 Follow Us</h4>

                            <div className="flex flex-wrap gap-4">
                                {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map((platform, idx) => (
                                    <button
                                        key={idx}
                                        className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-full font-semibold text-sm hover:bg-gradient-to-r hover:from-rose-700 hover:to-orange-500 hover:text-white transition"
                                    >
                                        {platform}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Contact
