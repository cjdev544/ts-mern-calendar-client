import Router from './router/Router'
import useAuthState from './hooks/useAuthState'
import 'sweetalert2/dist/sweetalert2.min.css'
import { useEffect } from 'react'

export default function App() {
  const { auth, checkingAuth } = useAuthState()

  useEffect(() => {
    checkingAuth()
  }, [])

  return <Router isAuth={auth.status} />
}
