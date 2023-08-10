import {
  onCheckAuthUser,
  onLoginUser,
  onLogoutUser,
} from '../store/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../store/redux-hooks'
import { RootState } from '../store/store'
import fetchData from '../helpers/fetchData'
import Swal from 'sweetalert2'
import {
  StorageSave,
  type CalendarFormLogin,
  type CalendarFormRegister,
} from '../../types.d'

export default function useAuthState() {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state: RootState) => state.auth)

  const checkingAuth = async () => {
    dispatch(onCheckAuthUser())
    const token = localStorage.getItem(StorageSave.TOKEN)

    if (!token) {
      dispatch(onLogoutUser())
      return
    }

    const res = await fetchData('/v1/users/renew', 'GET')
    if (!res.ok) {
      dispatch(onLogoutUser())
      return Swal.fire({
        icon: 'error',
        title: res.msg,
        showConfirmButton: false,
        timer: 2500,
      })
    }

    localStorage.setItem(StorageSave.TOKEN, res.token)
    dispatch(onLoginUser({ name: res.name, uid: res.uid }))
  }

  const loginUser = async (user: CalendarFormLogin) => {
    dispatch(onCheckAuthUser())
    const body = {
      email: user.emailLogin,
      password: user.passwordLogin,
    }

    const res = await fetchData('/v1/users/login', 'POST', body)

    if (!res.ok) {
      dispatch(onLogoutUser())
      return Swal.fire({
        icon: 'error',
        title: res.msg,
        showConfirmButton: false,
        timer: 2500,
      })
    }

    localStorage.setItem(StorageSave.TOKEN, res.user.token)
    dispatch(onLoginUser({ name: res.user.name, uid: res.user.uid }))
  }

  const registerUser = async (user: CalendarFormRegister) => {
    dispatch(onCheckAuthUser())
    localStorage.removeItem(StorageSave.TOKEN)
    const body = {
      name: user.nameRegister,
      email: user.emailRegister,
      password: user.passwordRegister,
    }

    const res = await fetchData('/v1/users/register', 'POST', body)

    if (!res.ok) {
      dispatch(onLogoutUser())
      localStorage.removeItem(StorageSave.TOKEN)
      return Swal.fire({
        icon: 'error',
        title: res.msg,
        showConfirmButton: false,
        timer: 2500,
      })
    }

    localStorage.setItem(StorageSave.TOKEN, res.user.token)
    dispatch(onLoginUser({ name: res.user.name, uid: res.user.uid }))
  }

  const logoutUser = () => {
    dispatch(onLogoutUser())
    localStorage.removeItem(StorageSave.TOKEN)
  }

  return {
    auth,
    checkingAuth,
    loginUser,
    registerUser,
    logoutUser,
  }
}
