import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { authRoutes } from '../auth/routes/auth-routes'
import { calendarRoutes } from '../calendar/routes/calendar-routes'
import { AuthStatus } from '../../types.d'

interface Props {
  isAuth: AuthStatus
}

export default function Router({ isAuth }: Props) {
  const routes = {
    [AuthStatus.AUTHENTICATED]: calendarRoutes,
    [AuthStatus.NOT_AUTHENTICATED]: authRoutes,
    [AuthStatus.CHECKING]: authRoutes,
  }
  const router = createBrowserRouter(routes[isAuth])

  return <RouterProvider router={router} />
}
