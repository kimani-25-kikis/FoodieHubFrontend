import React from 'react'
import SignUp from '../assets/signup3.webp'
import { Link, useNavigate } from 'react-router'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { AuthApi } from '../features/api/AuthApi'
import { Toaster, toast } from 'sonner'

type RegisterFormValues = {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  password: string
}

const Register: React.FC = () => {
  // RTK Query mutation hook for registration
  const [registerUser, { isLoading }] = AuthApi.useRegisterMutation()
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>()
  const navigate = useNavigate()

  // Handle form submission
  const handleSubmitForm: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      const response = await registerUser(data).unwrap()
      console.log('Registration successful:', response)
      navigate('/login')
    } catch (error: any) {
      console.error('Registration failed:', error)
      toast.error(error.data.error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 via-white to-orange-50">
      <Toaster position="top-right" richColors />

      <div className="flex-grow flex items-center justify-center py-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden w-full max-w-6xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-red-100">
          
          {/* --- Left: Illustration Section --- */}
          <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-b from-red-50 to-orange-50 p-10">
            <img
              src={SignUp}
              alt="Register"
              className="w-full max-w-sm drop-shadow-lg hover:scale-105 transition-transform duration-500"
            />
            <h3 className="text-red-800 text-2xl font-semibold mt-6">
              Join FoodieHub Today 🍴
            </h3>
            <p className="text-gray-600 text-center text-sm mt-2 max-w-sm">
              Experience delicious meals and seamless online ordering with FoodieHub Eatery.
            </p>
          </div>

          {/* --- Right: Form Section --- */}
          <div className="flex items-center justify-center p-10">
            <div className="w-full max-w-md bg-white rounded-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-red-800 mb-1">
                  Create Account
                </h2>
                <p className="text-gray-500 text-base">
                  Join the FoodieHub Eatery community
                </p>
              </div>

              <form className="flex flex-col gap-5" onSubmit={handleSubmit(handleSubmitForm)}>
                {/* Name Fields */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="first_name">
                      First Name
                    </label>
                    <input
                      {...register('first_name', { required: 'First name is required', minLength: { value: 2, message: 'First name must be at least 2 characters' } })}
                      type="text"
                      id="first_name"
                      placeholder="Joshua"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-red-700 outline-none transition-all"
                    />
                    {errors.first_name && <p className="mt-1 text-sm text-red-600">{errors.first_name.message}</p>}
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="last_name">
                      Last Name
                    </label>
                    <input
                      {...register('last_name', { required: 'Last name is required', minLength: { value: 2, message: 'Last name must be at least 2 characters' } })}
                      type="text"
                      id="last_name"
                      placeholder="Ngigi"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-red-700 outline-none transition-all"
                    />
                    {errors.last_name && <p className="mt-1 text-sm text-red-600">{errors.last_name.message}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                    Email
                  </label>
                  <input
                    {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-red-700 outline-none transition-all"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone_number">
                    Phone Number
                  </label>
                  <input
                    {...register('phone_number', { required: 'Phone number is required', pattern: { value: /^[0-9]{10,15}$/, message: 'Invalid phone number' } })}
                    type="tel"
                    id="phone_number"
                    placeholder="0712345678"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-red-700 outline-none transition-all"
                  />
                  {errors.phone_number && <p className="mt-1 text-sm text-red-600">{errors.phone_number.message}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                    Password
                  </label>
                  <input
                    {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-red-700 outline-none transition-all"
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-red-800 hover:bg-red-900 text-white px-4 py-3 rounded-lg font-semibold text-base transition-all duration-300 shadow-md hover:shadow-lg mt-2 disabled:opacity-70"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>

                {/* Footer Links */}
                <div className="text-center mt-6 space-y-2">
                  <Link to="/" className="text-red-800 text-sm hover:underline block">
                    🏡 Go to HomePage
                  </Link>
                  <Link to="/login" className="text-amber-600 text-sm hover:underline block">
                    Already have an account? Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
