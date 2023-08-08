import { Navigate } from 'react-router-dom'
import CalendarPage from '../pages/CalendarPage'
import { type RouteType } from '../../../types.d'

export const calendarRoutes: RouteType[] = [
  {
    path: '/',
    element: <CalendarPage />,
  },
  {
    path: '/*',
    element: <Navigate to='/' />,
  },
]
