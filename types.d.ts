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
  start: number
  end: number
  bgColor: string
  user: User
}
