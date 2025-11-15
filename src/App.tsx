import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register'
import Meals from './pages/Meals'
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';



function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/login" replace />,
    },
    {
      path: '/home',
      element: <Home />
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
      path: '/meals',
      element: <Meals />,
    },
    {
    path: '/login',
    element: <Login />,
  },
    
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App