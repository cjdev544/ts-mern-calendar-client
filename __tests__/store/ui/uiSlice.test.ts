import { uiSlice } from '../../../src/store/ui/uiSlice'

describe('Test is uiSlice', () => {
  test('should return the initial state', () => {
    expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false })
  })

  test('should handle onOpenDateModal', () => {
    expect(
      uiSlice.reducer(
        uiSlice.getInitialState(),
        uiSlice.actions.onOpenDateModal()
      )
    ).toEqual({
      isDateModalOpen: true,
    })

    expect(
      uiSlice.reducer(
        uiSlice.getInitialState(),
        uiSlice.actions.onCloseDateModal()
      )
    ).toEqual({
      isDateModalOpen: false,
    })
  })
})
