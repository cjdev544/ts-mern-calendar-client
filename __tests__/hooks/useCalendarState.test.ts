/* eslint-disable no-extra-semi */
import { act, renderHook } from '@testing-library/react'
import useCalendarState from '../../src/hooks/useCalendarState'
import fetchData from '../../src/helpers/fetchData'
import {
  EventInitialState,
  eventToCreate,
  eventToUpdate,
} from '../fixtures/eventsState'
import {
  onCreateNewEvent,
  onDeleteEvent,
  onGetAllEvents,
  onSelectActiveEvent,
  onUpdateEvent,
} from '../../src/store/calendar/calendarSlice'

jest.mock('../../src/store/redux-hooks', () => ({
  useAppSelector: (state) => state,
  useAppDispatch: () => jest.fn(),
}))

jest.mock('../../src/store/calendar/calendarSlice')
jest.mock('../../src/helpers/fetchData')

describe('Test useCalendarState', () => {
  beforeEach(() => jest.clearAllMocks())

  test('should return default values', () => {
    const { result } = renderHook(() => useCalendarState())

    expect(result.current).toEqual({
      events: undefined,
      activeEvent: undefined,
      getAllEvents: expect.any(Function),
      selectedEvent: expect.any(Function),
      updateEvent: expect.any(Function),
      createNewEvent: expect.any(Function),
      deleteEvent: expect.any(Function),
    })
  })

  test('should return all events', async () => {
    ;(fetchData as jest.Mock).mockReturnValue({
      ok: true,
      ...EventInitialState,
    })

    const { result } = renderHook(() => useCalendarState())
    const { getAllEvents } = result.current

    await act(async () => await getAllEvents())

    expect(fetchData).toHaveBeenCalledWith('/v1/events', 'GET')
    expect(onGetAllEvents).toHaveBeenCalledWith(EventInitialState.events)
  })

  test('should select event', () => {
    ;(fetchData as jest.Mock).mockReturnValue({
      ok: true,
      ...EventInitialState,
    })

    const { result } = renderHook(() => useCalendarState())
    const { selectedEvent } = result.current

    act(() => selectedEvent(EventInitialState.events[0]))

    expect(onSelectActiveEvent).toHaveBeenCalledWith(
      EventInitialState.events[0]
    )
  })

  test('should update a event', async () => {
    ;(fetchData as jest.Mock).mockReturnValue({
      ok: true,
      ...EventInitialState,
    })

    const { result } = renderHook(() => useCalendarState())
    const { updateEvent } = result.current

    await act(async () => await updateEvent(eventToUpdate))

    expect(fetchData).toHaveBeenCalledWith(
      `/v1/events/${eventToUpdate.id}`,
      'PUT',
      eventToUpdate
    )
    expect(onUpdateEvent).toHaveBeenCalledWith(eventToUpdate)
  })

  test('should create a new event', async () => {
    ;(fetchData as jest.Mock).mockReturnValue({
      ok: true,
      event: eventToUpdate,
    })

    const { result } = renderHook(() => useCalendarState())
    const { createNewEvent } = result.current

    await act(async () => await createNewEvent(eventToCreate))

    expect(fetchData).toHaveBeenCalledWith('/v1/events', 'POST', eventToCreate)
    expect(onCreateNewEvent).toHaveBeenCalledWith(eventToUpdate)
  })

  test('should delete a event', async () => {
    ;(fetchData as jest.Mock).mockReturnValue({
      ok: true,
      event: eventToUpdate,
    })

    const { result } = renderHook(() => useCalendarState())
    const { deleteEvent } = result.current

    await act(async () => await deleteEvent(EventInitialState.events[0]))

    expect(fetchData).toHaveBeenCalledWith(
      `/v1/events/${EventInitialState.events[0].id}`,
      'DELETE',
      EventInitialState.events[0]
    )
    expect(onDeleteEvent).toHaveBeenCalledWith(EventInitialState.events[0])
  })
})
