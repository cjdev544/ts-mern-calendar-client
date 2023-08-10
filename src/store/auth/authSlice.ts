import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AuthStatus, type User } from '../../../types.d'

interface State {
  status: AuthStatus
  user: User | null
  errorMessage: string | null
}

const initialState: State = {
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
