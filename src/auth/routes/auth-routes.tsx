import { Navigate } from 'react-router-dom'
import AuthenticationPage from '../pages/AuthenticationPage'
import { type RouteType } from '../../../types.d'

export const authRoutes: RouteType[] = [
  {
    path: '/auth/*',
    element: <AuthenticationPage />,
  },
  {
    path: '/*',
    element: <Navigate to='/auth/*' />,
  },
]
