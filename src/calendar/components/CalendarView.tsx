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

  return (
    <>
      <Calendar
        culture='es'
        defaultView={lastView}
        localizer={localizer}
        events={events}
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
