import { EventProps } from 'react-big-calendar'
import { type EventCalendar } from '../../../types.d'

type Props = EventProps<EventCalendar>

export default function CalendarEventBox({ event }: Props) {
  const { title, user } = event

  return (
    <>
      <strong>{title}</strong>
      <span> - {user.name}</span>
    </>
  )
}
