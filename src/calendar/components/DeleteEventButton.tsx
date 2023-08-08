import useCalendarState from '../../hooks/useCalendarState'
import useUiState from '../../hooks/useUiState'

export default function DeleteEventButton() {
  const { isDateModalOpen } = useUiState()
  const { activeEvent, deleteEvent } = useCalendarState()

  if (!activeEvent) return null

  return (
    <button
      className='btn btn-danger custom-btn-2'
      style={{ display: isDateModalOpen ? 'none' : 'flex' }}
      onClick={() => deleteEvent(activeEvent)}
    >
      <i className='fas fa-trash-alt'></i>
    </button>
  )
}
