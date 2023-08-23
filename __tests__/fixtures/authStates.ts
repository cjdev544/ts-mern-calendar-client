import { type AuthState, AuthStatus } from '../../types.d'

export const authInitialState: AuthState = {
  status: AuthStatus.CHECKING,
  user: null,
  errorMessage: null,
}
