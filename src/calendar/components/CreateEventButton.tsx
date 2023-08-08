import useUiState from '../../hooks/useUiState'

export default function CreateEventButton() {
  const { isDateModalOpen, openDateModal } = useUiState()

  return (
    <button
      className='btn btn-primary custom-btn'
      style={{ display: isDateModalOpen ? 'none' : 'flex' }}
      onClick={openDateModal}
    >
      <i className='fas fa-plus'></i>
    </button>
  )
}
