import {
  onCheckAuthUser,
  onLoginUser,
  onLogoutUser,
  onRegisterUser,
} from '../store/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../store/redux-hooks'
import { RootState } from '../store/store'
import { type User } from '../../types.d'

export default function useAuthState() {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state: RootState) => state.auth)

  const checkingAuth = () => {
    dispatch(onCheckAuthUser())
  }

  const loginUser = (user: User) => {
    dispatch(onLoginUser(user))
  }

  const registerUser = (user: User) => {
    dispatch(onRegisterUser(user))
  }

  const logoutUser = () => {
    dispatch(onLogoutUser())
  }

  return {
    auth,
    checkingAuth,
    loginUser,
    registerUser,
    logoutUser,
  }
}
