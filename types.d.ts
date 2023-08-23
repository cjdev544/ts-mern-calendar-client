import { type ReactElement } from 'react'

export enum AuthStatus {
  AUTHENTICATED = 'AUTHENTICATED',
  NOT_AUTHENTICATED = 'NOT_AUTHENTICATED',
  CHECKING = 'CHECKING',
}

export enum StorageSave {
  LAST_VIEW = 'LAST_VIEW',
  TOKEN = 'TOKEN',
}

export enum DateName {
  START = 'start',
  END = 'end',
}

export interface RouteType {
  path: string
  element: ReactElement
}

export interface User {
  uid: string
  name: string
}

export interface EventCalendar {
  id: string | null
  title: string
  notes: string
  start: Date | number
  end: Date | number
  bgColor: string
  user: User
}

export interface EventCalendarSlice {
  id: string | null
  title: string
  notes: string
  start: Date | number
  end: Date | number
  bgColor: string
  user: User
}

export interface CalendarFormLogin {
  emailLogin: string
  passwordLogin: string
}

export interface CalendarFormRegister {
  nameRegister: string
  emailRegister: string
  passwordRegister: string
  repeatPasswordRegister: string
}

// States
export interface AuthState {
  status: AuthStatus
  user: User | null
  errorMessage: string | null
}

export interface EventState {
  events: EventCalendar[]
  activeEvent: EventCalendar | null
}
