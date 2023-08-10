import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import CalendarEventBox from './CalendarEventBox'
import useCalendarView from '../hooks/useCalendarView'

export default function CalendarView() {
  const {
    events,
    lastView,
    localizer,
    messages,
    eventStyleGetter,
    handleDoubleClickEvent,
    handleSelectEvent,
    handleView,
  } = useCalendarView()

  const eventsDate = events.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }))

  return (
    <>
      <Calendar
        culture='es'
        defaultView={lastView}
        localizer={localizer}
        events={eventsDate}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 'calc(100vh - 80px)' }}
        messages={messages}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox,
        }}
        onSelectEvent={handleSelectEvent}
        onDoubleClickEvent={handleDoubleClickEvent}
        onView={handleView}
      />
    </>
  )
}
