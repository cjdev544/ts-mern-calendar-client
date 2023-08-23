import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { type EventState, type EventCalendar } from '../../../types.d'

const initialState: EventState = {
  events: [],
  activeEvent: null,
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onGetAllEvents: (state, action: PayloadAction<EventCalendar[]>) => {
      state.activeEvent = null
      state.events = action.payload
    },

    onSelectActiveEvent: (
      state,
      action: PayloadAction<EventCalendar | null>
    ) => {
      state.activeEvent = action.payload
    },

    onUpdateEvent: (state, action: PayloadAction<EventCalendar>) => {
      state.activeEvent = null
      state.events = state.events.map((event) =>
        event.id === action.payload.id ? action.payload : event
      )
    },

    onCreateNewEvent: (state, action: PayloadAction<EventCalendar>) => {
      state.activeEvent = null
      state.events.push(action.payload)
    },

    onDeleteEvent: (state, action: PayloadAction<EventCalendar>) => {
      state.activeEvent = null
      state.events = state.events.filter(
        (event) => event.id !== action.payload.id
      )
    },

    cleanEvents: (state) => {
      state.activeEvent = null
      state.events = []
    },
  },
})

export const {
  cleanEvents,
  onGetAllEvents,
  onSelectActiveEvent,
  onUpdateEvent,
  onCreateNewEvent,
  onDeleteEvent,
} = calendarSlice.actions
