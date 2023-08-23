import React from 'react'
import { render } from '@testing-library/react'

import CalendarModal from '../../../src/calendar/components/CalendarModal'

describe('Test in <CalendarModal />', () => {
  test('should component correctly render', () => {
    render(<CalendarModal />)
  })
})
