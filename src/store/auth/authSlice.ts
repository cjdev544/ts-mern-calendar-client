import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type AuthState, AuthStatus, type User } from '../../../types.d'

const initialState: AuthState = {
  status: AuthStatus.CHECKING,
  user: null,
  errorMessage: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onCheckAuthUser: (state) => {
      state.status = AuthStatus.CHECKING
      state.user = null
      state.errorMessage = null
    },
    onLoginUser: (state, { payload }: PayloadAction<User>) => {
      state.status = AuthStatus.AUTHENTICATED
      state.user = payload
      state.errorMessage = null
    },
    onLogoutUser: (state) => {
      state.status = AuthStatus.NOT_AUTHENTICATED
      state.user = null
      state.errorMessage = null
    },
  },
})

export const { onCheckAuthUser, onLoginUser, onLogoutUser } = authSlice.actions
