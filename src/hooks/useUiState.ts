import { onSelectActiveEvent } from '../store/calendar/calendarSlice'
import { onCloseDateModal, onOpenDateModal } from '../store/ui/uiSlice'
import { useAppDispatch, useAppSelector } from '../store/redux-hooks'

export default function useUiState() {
  const dispatch = useAppDispatch()

  const { isDateModalOpen } = useAppSelector((state) => state.ui)

  const openDateModal = () => {
    dispatch(onOpenDateModal())
  }

  const closeDateModal = () => {
    dispatch(onCloseDateModal())
    dispatch(onSelectActiveEvent(null))
  }

  return {
    isDateModalOpen,
    openDateModal,
    closeDateModal,
  }
}
