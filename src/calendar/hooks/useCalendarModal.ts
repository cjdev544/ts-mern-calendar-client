import { addHours, differenceInSeconds } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import Swal from 'sweetalert2'

import useUiState from '../../hooks/useUiState'
import useCalendarState from '../../hooks/useCalendarState'
import { DateName, type EventCalendar } from '../../../types.d'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

const formInitialState = {
  id: null,
  title: '',
  notes: '',
  start: new Date().getTime(),
  end: addHours(new Date(), 2).getTime(),
  bgColor: '#fafafa',
  user: { name: 'nameTest', uid: '123' },
}

export default function useCalendarModal() {
  const { activeEvent, updateEvent, createNewEvent } = useCalendarState()

  const [isSubmitted, setIsSubmitted] = useState(false)

  const [dataForm, setDataForm] = useState<EventCalendar>(formInitialState)
  const { title, notes, start, end } = dataForm

  useEffect(() => {
    if (activeEvent) setDataForm(activeEvent)
  }, [activeEvent])

  const { isDateModalOpen, openDateModal, closeDateModal } = useUiState()

  const openModal = () => openDateModal()
  const closeModal = () => closeDateModal()

  const inputAlert = useMemo(() => {
    if (!isSubmitted) return false
    if (title.trim().length === 0) return true
    return false
  }, [isSubmitted, title])

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    })
  }

  const handleDateChange = (date: number | null, dateName: DateName) => {
    if (date && dateName === DateName.START) {
      setDataForm({
        ...dataForm,
        start: date,
      })
    }
    if (date && dateName === DateName.END) {
      setDataForm({
        ...dataForm,
        end: date,
      })
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitted(true)
    const difference = differenceInSeconds(end, start)

    if (isNaN(difference) || difference <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La fecha de finalización debe ser mayor a la de inicio',
      })
      return
    }

    if (title.trim().length === 0) {
      return
    }

    if (dataForm.id) {
      updateEvent(dataForm)
    } else {
      createNewEvent(dataForm)
    }
    setIsSubmitted(false)
    setDataForm(formInitialState)
    closeDateModal()
  }

  return {
    customStyles,
    end,
    inputAlert,
    isDateModalOpen,
    notes,
    start,
    title,
    openModal,
    closeModal,
    handleDateChange,
    handleSubmit,
    handleTextChange,
  }
}
