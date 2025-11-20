import { RouterProvider, createBrowserRouter } from 'react-router'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Meals from './pages/Meals'
import Register from './pages/Register'
import UserDashboard from './pages/userPages/UserDashboard'
import Orders from './pages/userPages/Orders'
import UserProfile from './pages/userPages/UserProfile'
import AdminDashboard from './pages/admin/AdminDashboard'
import AllOrders from './pages/admin/AllOrders'
import AllMenuItems from './pages/admin/AllMenuItems'
import AllCustomers from './pages/admin/AllCustomers'
import AllRestaurants from './pages/admin/AllRestaurants'


function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/meals',
      element: <Meals />
    },
    {
      path: '/about',
      element: <About />
    },
    {
      path: '/contact',
      element: <Contact />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/login',
      element: <Login />
    },
    // User Dashboard routes
    {
      path: '/dashboard',
      element: <UserDashboard />
    },
    {
      path: '/dashboard/my-orders',
      element: <Orders />
    },
    {
      path: '/dashboard/user-profile',
      element: <UserProfile />
    },
    // Admin dashboard routes
    {
      path: '/admin/dashboard',
      element: <AdminDashboard />
    },
    {
      path: '/admin/dashboard/all-orders',
      element: <AllOrders />
    },
    {
      path: '/admin/dashboard/all-menu-items',
      element: <AllMenuItems />
    },
    {
      path: '/admin/dashboard/all-customers',
      element: <AllCustomers />
    },
    {
      path: '/admin/dashboard/all-restaurants',
      element: <AllRestaurants />
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App