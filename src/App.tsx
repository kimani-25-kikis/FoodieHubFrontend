import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register'
import Meals from './pages/Meals';



function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/login" replace />,
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