import { calendarSlice } from '../../../src/store/calendar/calendarSlice'
import { type EventCalendar } from '../../../types.d'

describe('Test in calendarSlice', () => {
  const events: EventCalendar[] = [
    {
      id: '1',
      title: 'Event 1',
      bgColor: '#fafafa',
      end: new Date(),
      start: new Date(),
      notes: 'notes event 1',
      user: {
        uid: '1',
        name: 'name 1',
      },
    },
    {
      id: '2',
      title: 'Event 2',
      bgColor: '#fafafa',
      end: new Date(),
      start: new Date(),
      notes: 'notes event 2',
      user: {
        uid: '2',
        name: 'name 2',
      },
    },
  ]

  test('should return initial state', () => {
    expect(calendarSlice.getInitialState()).toEqual({
      events: [],
      activeEvent: null,
    })
  })

  test('should return all events', () => {
    const changedState = calendarSlice.reducer(
      calendarSlice.getInitialState(),
      calendarSlice.actions.onGetAllEvents(events)
    )

    expect(changedState.activeEvent).toBeNull()
    expect(changedState.events).toEqual(events)
  })

  test('should active event', () => {
    calendarSlice.reducer(
      calendarSlice.getInitialState(),
      calendarSlice.actions.onGetAllEvents(events)
    )

    const state = calendarSlice.reducer(
      calendarSlice.getInitialState(),
      calendarSlice.actions.onSelectActiveEvent(events[0])
    )

    expect(state.activeEvent).toEqual(events[0])
  })

  test('should update event', () => {
    const eventsState = calendarSlice.reducer(
      calendarSlice.getInitialState(),
      calendarSlice.actions.onGetAllEvents(events)
    )

    const newEvent = {
      id: '1',
      title: 'Event 11',
      bgColor: '#fafafa',
      end: new Date(),
      start: new Date(),
      notes: 'notes event 11',
      user: {
        uid: '1',
        name: 'name 1',
      },
    }

    const state = calendarSlice.reducer(
      eventsState,
      calendarSlice.actions.onUpdateEvent(newEvent)
    )

    expect(state.events).toEqual([newEvent, events[1]])
    expect(state.activeEvent).toBeNull()
  })

  test('should create a new event', () => {
    const eventsState = calendarSlice.reducer(
      calendarSlice.getInitialState(),
      calendarSlice.actions.onGetAllEvents(events)
    )

    const newEvent = {
      id: '3',
      title: 'Event 3',
      bgColor: '#fafafa',
      end: new Date(),
      start: new Date(),
      notes: 'notes event 3',
      user: {
        uid: '3',
        name: 'name 3',
      },
    }

    const state = calendarSlice.reducer(
      eventsState,
      calendarSlice.actions.onCreateNewEvent(newEvent)
    )

    expect(state.events).toEqual([...events, newEvent])
    expect(state.activeEvent).toBeNull()
  })

  test('should delete a new event', () => {
    const eventsState = calendarSlice.reducer(
      calendarSlice.getInitialState(),
      calendarSlice.actions.onGetAllEvents(events)
    )

    const state = calendarSlice.reducer(
      eventsState,
      calendarSlice.actions.onDeleteEvent(events[0])
    )

    expect(state.events).toEqual([events[1]])
    expect(state.activeEvent).toBeNull()
  })

  test('should clean all events', () => {
    const eventsState = calendarSlice.reducer(
      calendarSlice.getInitialState(),
      calendarSlice.actions.onGetAllEvents(events)
    )

    const state = calendarSlice.reducer(
      eventsState,
      calendarSlice.actions.cleanEvents()
    )

    expect(state.events).toEqual([])
    expect(state.activeEvent).toBeNull()
  })
})
