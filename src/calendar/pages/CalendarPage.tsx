import NavBar from '../components/NavBar'
import CalendarView from '../components/CalendarView'
import CalendarModal from '../components/CalendarModal'
import CreateEventButton from '../components/CreateEventButton'
import DeleteEventButton from '../components/DeleteEventButton'
import { useEffect } from 'react'
import useCalendarState from '../../hooks/useCalendarState'

export default function CalendarPage() {
  const { getAllEvents } = useCalendarState()

  useEffect(() => {
    getAllEvents()
  }, [])

  return (
    <>
      <NavBar />
      <CalendarView />
      <CalendarModal />
      <CreateEventButton />
      <DeleteEventButton />
    </>
  )
}
