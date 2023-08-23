import { act, renderHook } from '@testing-library/react'

import useAuthState from '../../src/hooks/useAuthState'
import {
  onCheckAuthUser,
  onLoginUser,
  onLogoutUser,
} from '../../src/store/auth/authSlice'
import { cleanEvents } from '../../src/store/calendar/calendarSlice'
import fetchData from '../../src/helpers/fetchData'
import { StorageSave, type AuthState } from '../../types.d'

jest.mock('../../src/store/redux-hooks', () => ({
  useAppSelector: (state: AuthState) => state,
  useAppDispatch: () => jest.fn(),
}))

jest.mock('../../src/store/auth/authSlice')
jest.mock('../../src/helpers/fetchData')
jest.mock('../../src/store/calendar/calendarSlice')

// jest.mock('firebase/auth', () => ({
//   ...jest.requireActual('firebase/auth'),
//   onAuthStateChanged: jest.fn(),
// }))

describe('Test in useAuthState', () => {
  beforeEach(() => jest.clearAllMocks())

  test('should return default state', async () => {
    localStorage.clear()
    localStorage.setItem(StorageSave.TOKEN, 'token')

    const { result } = renderHook(() => useAuthState())

    expect(result.current).toEqual({
      auth: expect.any(Function),
      checkingAuth: expect.any(Function),
      loginUser: expect.any(Function),
      logoutUser: expect.any(Function),
      registerUser: expect.any(Function),
    })
  })

  test('should call to onCheckAuthUser, onLogoutUser but not onLoginUser', async () => {
    localStorage.clear()

    const { result } = renderHook(() => useAuthState())
    const { checkingAuth } = result.current

    await act(async () => await checkingAuth())

    expect(onCheckAuthUser).toHaveBeenCalledTimes(1)
    expect(onLogoutUser).toHaveBeenCalledTimes(1)
    expect(onLoginUser).toHaveBeenCalledTimes(0)
  })

  test('should call to onCheckAuthUser, onLogoutUser and fetchData but not onLoginUser', async () => {
    localStorage.clear()
    localStorage.setItem(StorageSave.TOKEN, 'token')

    const { result } = renderHook(() => useAuthState())
    const { checkingAuth } = result.current

    ;(fetchData as jest.Mock).mockReturnValue({
      ok: false,
    })

    await act(async () => await checkingAuth())

    expect(onCheckAuthUser).toHaveBeenCalledTimes(1)
    expect(onLogoutUser).toHaveBeenCalledTimes(1)
    expect(onLoginUser).toHaveBeenCalledTimes(0)
  })

  test('should call to onCheckAuthUser, onLoginUser and fetchData but not onLogoutUser', async () => {
    localStorage.clear()
    localStorage.setItem(StorageSave.TOKEN, 'token')

    const { result } = renderHook(() => useAuthState())
    const { checkingAuth } = result.current
    const user = { name: 'name', uid: 'uid', token: 'other token' }

    ;(fetchData as jest.Mock).mockReturnValue({
      ok: true,
      name: user.name,
      uid: user.uid,
      token: user.token,
    })

    await act(async () => await checkingAuth())

    expect(fetchData).toHaveBeenCalledTimes(1)
    expect(fetchData).toHaveBeenCalledWith('/v1/users/renew', 'GET')
    expect(onCheckAuthUser).toHaveBeenCalledTimes(1)
    expect(onLogoutUser).toHaveBeenCalledTimes(0)
    expect(localStorage.getItem(StorageSave.TOKEN)).toBe(user.token)
    expect(onLoginUser).toHaveBeenCalledWith({ name: user.name, uid: user.uid })
  })

  test('should login user', async () => {
    localStorage.clear()
    localStorage.setItem(StorageSave.TOKEN, 'token')

    const { result } = renderHook(() => useAuthState())
    const { loginUser } = result.current
    const user = { name: 'name', uid: 'uid', token: 'other token' }

    const body = {
      emailLogin: 'test@test.com',
      passwordLogin: 'password_test',
    }

    ;(fetchData as jest.Mock).mockReturnValue({
      ok: true,
      user: {
        name: user.name,
        uid: user.uid,
        token: user.token,
      },
    })

    await act(async () => await loginUser(body))

    expect(fetchData).toHaveBeenCalledTimes(1)
    expect(fetchData).toHaveBeenCalledWith('/v1/users/login', 'POST', {
      password: body.passwordLogin,
      email: body.emailLogin,
    })
    expect(onCheckAuthUser).toHaveBeenCalledTimes(1)
    expect(onLogoutUser).toHaveBeenCalledTimes(0)
    expect(localStorage.getItem(StorageSave.TOKEN)).toBe(user.token)
    expect(onLoginUser).toHaveBeenCalledWith({ name: user.name, uid: user.uid })
  })

  test('should register user', async () => {
    localStorage.clear()
    localStorage.setItem(StorageSave.TOKEN, 'token')

    const { result } = renderHook(() => useAuthState())
    const { registerUser } = result.current
    const user = { name: 'name', uid: 'uid', token: 'other token' }

    const body = {
      emailRegister: 'test@test.com',
      passwordRegister: 'password_test',
      repeatPasswordRegister: 'password_test',
      nameRegister: 'name_test',
    }

    ;(fetchData as jest.Mock).mockReturnValue({
      ok: true,
      user: {
        name: user.name,
        uid: user.uid,
        token: user.token,
      },
    })

    await act(async () => await registerUser(body))

    expect(fetchData).toHaveBeenCalledTimes(1)
    expect(fetchData).toHaveBeenCalledWith('/v1/users/register', 'POST', {
      password: body.passwordRegister,
      email: body.emailRegister,
      name: body.nameRegister,
    })
    expect(onCheckAuthUser).toHaveBeenCalledTimes(1)
    expect(onLogoutUser).toHaveBeenCalledTimes(0)
    expect(localStorage.getItem(StorageSave.TOKEN)).toBe(user.token)
    expect(onLoginUser).toHaveBeenCalledWith({ name: user.name, uid: user.uid })
  })

  test('should logout user', () => {
    localStorage.clear()
    localStorage.setItem(StorageSave.TOKEN, 'token')

    const { result } = renderHook(() => useAuthState())
    const { logoutUser } = result.current

    act(() => logoutUser())

    expect(onLogoutUser).toHaveBeenCalledTimes(1)
    expect(cleanEvents).toHaveBeenCalledTimes(1)
    expect(localStorage.getItem(StorageSave.TOKEN)).toBeNull()
  })
})
