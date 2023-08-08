import { useState } from 'react'
import { View, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import esES from 'date-fns/locale/es'

import useUiState from '../../hooks/useUiState'
import useCalendarState from '../../hooks/useCalendarState'
import { StorageSave, type EventCalendar } from '../../../types.d'

const locales = {
  es: esES,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const messages = {
  allDay: 'Todo el día',
  previous: '<',
  next: '>',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  noEventsInRange: 'No hay eventos en este rango',
  showMore: (total: unknown) => `+ Ver más (${total})`,
}

const eventStyleGetter = () => {
  const style = {
    backgroundColor: '#347CF7',
    borderRadius: '0',
    color: 'white',
    opacity: 0.8,
  }
  return { style }
}

export default function useCalendarView() {
  const [lastView, setLastView] = useState<View>(
    (localStorage.getItem(StorageSave.LAST_VIEW) as View) || 'week'
  )

  const { openDateModal } = useUiState()
  const { events, selectedEvent } = useCalendarState()

  const handleSelectEvent = (event: EventCalendar) => {
    selectedEvent(event)
  }

  const handleDoubleClickEvent = () => {
    openDateModal()
  }

  const handleView = (event: View) => {
    localStorage.setItem(StorageSave.LAST_VIEW, event)
    setLastView(event)
  }

  return {
    events,
    lastView,
    localizer,
    messages,
    eventStyleGetter,
    handleDoubleClickEvent,
    handleSelectEvent,
    handleView,
  }
}
