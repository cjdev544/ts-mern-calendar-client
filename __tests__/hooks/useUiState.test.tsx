import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { act, renderHook } from '@testing-library/react'

import useUiState from '../../src/hooks/useUiState'
import { uiSlice } from '../../src/store/ui/uiSlice'

const getMockStore = (initialState: unknown) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState: initialState || '',
  })
}

describe('Test in useUiState', () => {
  test('should return the default values', () => {
    const mockStore = getMockStore({
      ui: {
        isDateModalOpen: false,
      },
    })

    const { result } = renderHook(() => useUiState(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    })

    expect(result.current).toEqual({
      isDateModalOpen: false,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function),
    })
  })

  test('should open modal', () => {
    const mockStore = getMockStore({
      ui: {
        isDateModalOpen: false,
      },
    })

    const { result } = renderHook(() => useUiState(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    })

    const { openDateModal } = result.current

    act(() => openDateModal())

    expect(result.current.isDateModalOpen).toBeTruthy()
  })

  test('should close modal', () => {
    const mockStore = getMockStore({
      ui: {
        isDateModalOpen: true,
      },
    })

    const { result } = renderHook(() => useUiState(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    })

    const { closeDateModal } = result.current

    act(() => closeDateModal())

    expect(result.current.isDateModalOpen).toBeFalsy()
  })
})
