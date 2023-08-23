import Swal from 'sweetalert2'

import {
  onCreateNewEvent,
  onDeleteEvent,
  onGetAllEvents,
  onSelectActiveEvent,
  onUpdateEvent,
} from '../store/calendar/calendarSlice'
import { useAppDispatch, useAppSelector } from '../store/redux-hooks'
import fetchData from '../helpers/fetchData'
import { type EventCalendar } from '../../types.d'

export default function useCalendarState() {
  const dispatch = useAppDispatch()

  const { events, activeEvent } = useAppSelector((state) => state.calendar)

  const getAllEvents = async () => {
    const res = await fetchData('/v1/events', 'GET')
    dispatch(onGetAllEvents(res.events))
  }

  const selectedEvent = (event: EventCalendar) =>
    dispatch(onSelectActiveEvent(event))

  const updateEvent = async (event: EventCalendar) => {
    const res = await fetchData(`/v1/events/${event.id}`, 'PUT', event)
    if (!res.ok) {
      return Swal.fire({
        icon: 'error',
        title: res.msg,
        showConfirmButton: false,
        timer: 2500,
      })
    }

    Swal.fire({
      icon: 'success',
      title: res.msg,
      showConfirmButton: false,
      timer: 2500,
    })
    dispatch(onUpdateEvent(event))
  }

  const createNewEvent = async (event: EventCalendar) => {
    const res = await fetchData('/v1/events', 'POST', event)
    if (!res.ok) {
      return Swal.fire({
        icon: 'error',
        title: res.msg,
        showConfirmButton: false,
        timer: 2500,
      })
    }

    Swal.fire({
      icon: 'success',
      title: res.msg,
      showConfirmButton: false,
      timer: 2500,
    })
    dispatch(onCreateNewEvent(res.event))
  }

  const deleteEvent = async (event: EventCalendar) => {
    const res = await fetchData(`/v1/events/${event.id}`, 'DELETE', event)
    if (!res.ok) {
      return Swal.fire({
        icon: 'error',
        title: res.msg,
        showConfirmButton: false,
        timer: 2500,
      })
    }

    Swal.fire({
      icon: 'success',
      title: res.msg,
      showConfirmButton: false,
      timer: 2500,
    })
    dispatch(onDeleteEvent(event))
  }

  return {
    events,
    activeEvent,
    getAllEvents,
    selectedEvent,
    updateEvent,
    createNewEvent,
    deleteEvent,
  }
}
