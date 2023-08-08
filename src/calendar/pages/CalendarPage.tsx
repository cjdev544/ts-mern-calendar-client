import NavBar from '../components/NavBar'
import CalendarView from '../components/CalendarView'
import CalendarModal from '../components/CalendarModal'
import CreateEventButton from '../components/CreateEventButton'
import DeleteEventButton from '../components/DeleteEventButton'

export default function CalendarPage() {
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
