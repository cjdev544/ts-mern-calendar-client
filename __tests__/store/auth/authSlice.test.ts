import { authSlice } from '../../../src/store/auth/authSlice'
import { AuthStatus } from '../../../types.d'

describe('Test in authSlice', () => {
  test('should return the initial state', () => {
    expect(authSlice.getInitialState()).toEqual({
      status: AuthStatus.CHECKING,
      user: null,
      errorMessage: null,
    })
  })

  test('should check the user', () => {
    const user = {
      uid: '123abc',
      name: 'test',
      email: 'test@test.com',
      password: 'XXXXXXXXXXXXXX',
    }
    const state = authSlice.getInitialState()

    const changedState = authSlice.reducer(
      state,
      authSlice.actions.onLoginUser(user)
    )

    expect(changedState.status).toBe(AuthStatus.AUTHENTICATED)
    expect(changedState.user).toEqual(user)
    expect(changedState.errorMessage).toBe(null)
  })

  test('should logout the user', () => {
    const state = authSlice.getInitialState()

    const changedState = authSlice.reducer(
      state,
      authSlice.actions.onLogoutUser()
    )

    expect(changedState.status).toBe(AuthStatus.NOT_AUTHENTICATED)
    expect(changedState.user).toBeNull()
    expect(changedState.errorMessage).toBe(null)
  })

  test('should checking the user', () => {
    const user = {
      uid: '123abc',
      name: 'test',
      email: 'test@test.com',
      password: 'XXXXXXXXXXXXXX',
    }
    const state = authSlice.getInitialState()

    authSlice.reducer(state, authSlice.actions.onLoginUser(user))

    const changedState = authSlice.reducer(
      state,
      authSlice.actions.onCheckAuthUser()
    )

    expect(changedState.status).toBe(AuthStatus.CHECKING)
    expect(changedState.user).toBeNull()
    expect(changedState.errorMessage).toBe(null)
  })
})
