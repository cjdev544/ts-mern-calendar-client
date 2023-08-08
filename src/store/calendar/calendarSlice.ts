import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { type EventCalendar } from '../../../types.d'
import { addHours } from 'date-fns'

const events: EventCalendar[] = [
  {
    id: '1',
    title: 'Cumpleaños de Javier',
    notes: 'Comprar el pastel',
    start: new Date().getTime(),
    end: addHours(new Date(), 2).getTime(),
    bgColor: '#fafafa',
    user: { uid: '123', name: 'Jefferson' },
  },
]

interface State {
  events: EventCalendar[]
  activeEvent: EventCalendar | null
}

const initialState: State = {
  events: events,
  activeEvent: null,
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onSelectActiveEvent: (
      state,
      action: PayloadAction<EventCalendar | null>
    ) => {
      state.activeEvent = action.payload
    },
    onUpdateEvent: (state, action: PayloadAction<EventCalendar>) => {
      state.events = state.events.map((event) => {
        state.activeEvent = action.payload
        return event.id === action.payload.id ? action.payload : event
      })
    },
    onCreateNewEvent: (state, action: PayloadAction<EventCalendar>) => {
      state.events.push(action.payload)
    },
    onDeleteEvent: (state, action: PayloadAction<EventCalendar>) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload.id
      )
      state.activeEvent = null
    },
  },
})

export const {
  onSelectActiveEvent,
  onUpdateEvent,
  onCreateNewEvent,
  onDeleteEvent,
} = calendarSlice.actions
