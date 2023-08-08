import {
  onCreateNewEvent,
  onDeleteEvent,
  onSelectActiveEvent,
  onUpdateEvent,
} from '../store/calendar/calendarSlice'
import { useAppDispatch, useAppSelector } from '../store/redux-hooks'
import { type EventCalendar } from '../../types.d'

export default function useCalendarState() {
  const dispatch = useAppDispatch()

  const { events, activeEvent } = useAppSelector((state) => state.calendar)

  const selectedEvent = (event: EventCalendar) =>
    dispatch(onSelectActiveEvent(event))

  const updateEvent = (event: EventCalendar) => {
    // TODO: thunk
    dispatch(onUpdateEvent(event))
  }

  const createNewEvent = (event: EventCalendar) => {
    // TODO: thunk
    dispatch(onCreateNewEvent(event))
  }

  const deleteEvent = (event: EventCalendar) => {
    // TODO: thunk
    dispatch(onDeleteEvent(event))
  }

  return {
    events,
    activeEvent,
    selectedEvent,
    updateEvent,
    createNewEvent,
    deleteEvent,
  }
}
