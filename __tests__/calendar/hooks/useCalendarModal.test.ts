/* eslint-disable no-extra-semi */
import { renderHook } from '@testing-library/react'
import useCalendarModal from '../../../src/calendar/hooks/useCalendarModal'
import useCalendarState from '../../../src/hooks/useCalendarState'
import useUiState from '../../../src/hooks/useUiState'

jest.mock('../../../src/hooks/useCalendarState')
jest.mock('../../../src/hooks/useUiState')

describe('Test in useCalendarModal', () => {
  beforeEach(() => jest.clearAllMocks())

  test('should return default values', () => {
    ;(useCalendarState as jest.Mock).mockReturnValue({
      activeEvent: null,
    })
    ;(useUiState as jest.Mock).mockReturnValue({
      isDateModalOpen: false,
    })

    const { result } = renderHook(() => useCalendarModal())

    expect(result.current).toEqual({
      customStyles: expect.any(Object),
      end: expect.any(Number),
      inputAlert: false,
      isDateModalOpen: false,
      notes: '',
      start: expect.any(Number),
      title: '',
      openModal: expect.any(Function),
      closeModal: expect.any(Function),
      handleDateChange: expect.any(Function),
      handleSubmit: expect.any(Function),
      handleTextChange: expect.any(Function),
    })
  })
})
