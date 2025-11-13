import React from 'react'
import SignIn from '../assets/signin.avif'
import { Link, useNavigate } from 'react-router'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { AuthApi } from '../features/api/AuthApi'
import { toast, Toaster } from 'sonner'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../features/slice/AuthSlice'

type LoginFormValues = {
  email: string
  password: string
}

const Login: React.FC = () => {
  const [loginUser, { isLoading }] = AuthApi.useLoginMutation()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLoginForm: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const response = await loginUser(data).unwrap()
      console.log('Login successful:', response)
      dispatch(setCredentials({ token: response.token, user: response.userInfo }))
      navigate('/meals')
    } catch (error: any) {
      console.error('Login failed:', error)
      toast.error(error.data.error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 via-white to-orange-50">
      <Toaster position="top-right" richColors />

      <div className="flex-grow flex items-center justify-center py-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden w-full max-w-6xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-red-100">

          {/* --- Left: Image Section --- */}
          <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-b from-red-50 to-orange-50 p-10">
            <img
              src={SignIn}
              alt="Login Illustration"
              className="w-full max-w-sm drop-shadow-lg hover:scale-105 transition-transform duration-500"
            />
            <h3 className="text-red-800 text-2xl font-semibold mt-6">
              Welcome Back to FoodieHub 🍽️
            </h3>
            <p className="text-gray-600 text-center text-sm mt-2 max-w-sm">
              Log in to discover tasty dishes, exclusive offers, and your favorite meals.
            </p>
          </div>

          {/* --- Right: Form Section --- */}
          <div className="flex items-center justify-center p-10">
            <div className="w-full max-w-md bg-white rounded-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-red-800 mb-1">
                  Sign In
                </h2>
                <p className="text-gray-500 text-base">
                  Access your FoodieHub account
                </p>
              </div>

              <form className="flex flex-col gap-5" onSubmit={handleSubmit(handleLoginForm)}>
                {/* Email Field */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                    })}
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-red-700 outline-none transition-all"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>

                {/* Password Field */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Password must be at least 6 characters' }
                    })}
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-red-700 outline-none transition-all"
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                </div>

                {/* Forgot Password Link */}
                <div className="text-right">
                  <Link
                    to="#"
                    className="text-amber-600 text-sm hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-red-800 hover:bg-red-900 text-white px-4 py-3 rounded-lg font-semibold text-base transition-all duration-300 shadow-md hover:shadow-lg mt-2 disabled:opacity-70"
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </button>

                {/* Footer Links */}
                <div className="text-center mt-6 space-y-2">
                  <Link
                    to="/"
                    className="text-red-800 text-sm hover:underline block"
                  >
                    🏡 Go to HomePage
                  </Link>
                  <Link
                    to="/register"
                    className="text-amber-600 text-sm hover:underline block"
                  >
                    Don’t have an account? Register
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

export default Login
