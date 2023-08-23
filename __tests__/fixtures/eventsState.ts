import { type EventState } from '../../types.d'

export const EventInitialState: EventState = {
  events: [
    {
      bgColor: '#fafafa',
      end: new Date('2021-12-31T00:00:00.000Z'),
      start: new Date('2021-12-31T00:00:00.000Z'),
      id: '1',
      notes: 'event note 1',
      title: 'event 1',
      user: {
        uid: '1',
        name: 'user 1',
      },
    },
    {
      bgColor: '#fafafa',
      end: new Date('2021-12-31T00:00:00.000Z'),
      start: new Date('2021-12-31T00:00:00.000Z'),
      id: '2',
      notes: 'event note 2',
      title: 'event 2',
      user: {
        uid: '2',
        name: 'user 2',
      },
    },
    {
      bgColor: '#fafafa',
      end: new Date('2021-12-31T00:00:00.000Z'),
      start: new Date('2021-12-31T00:00:00.000Z'),
      id: '3',
      notes: 'event note 3',
      title: 'event 3',
      user: {
        uid: '1',
        name: 'user 1',
      },
    },
  ],
  activeEvent: null,
}

export const eventToUpdate = {
  bgColor: '#fcfcfc',
  end: new Date(),
  start: new Date(),
  id: '1',
  notes: 'event note 1 changed',
  title: 'event 1 changed',
  user: {
    uid: '1',
    name: 'user 1',
  },
}

export const eventToCreate = {
  bgColor: '#fcfcfc',
  end: new Date(),
  start: new Date(),
  id: '10',
  notes: 'event note 10',
  title: 'event 10',
  user: {
    uid: '1',
    name: 'user 1',
  },
}
