import Modal from 'react-modal'
import DatePicker, { registerLocale } from 'react-datepicker'
import es from 'date-fns/locale/es'
import 'react-datepicker/dist/react-datepicker.css'
import { DateName } from '../../../types.d'
import useCalendarModal from '../hooks/useCalendarModal'

Modal.setAppElement('#root')

registerLocale('es', es)

export default function CalendarModal() {
  const {
    customStyles,
    end,
    inputAlert,
    isDateModalOpen,
    notes,
    start,
    title,
    closeModal,
    handleDateChange,
    handleSubmit,
    handleTextChange,
  } = useCalendarModal()

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className='modal'
      overlayClassName='modal-fondo'
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className='container' onSubmit={handleSubmit}>
        <div className='form-group w-100 mb-2'>
          <label className='d-block'>Fecha y hora inicio</label>
          <DatePicker
            locale='es'
            timeCaption='Hora'
            className='form-control'
            selected={new Date(start)}
            onChange={(date) => {
              if (!date) return
              handleDateChange(date.getTime(), DateName.START)
            }}
            wrapperClassName='w-100'
            dateFormat='Pp'
            showTimeSelect
          />
        </div>

        <div className='form-group mb-2'>
          <label className='d-block'>Fecha y hora fin</label>
          <DatePicker
            locale='es'
            timeCaption='Hora'
            className='form-control'
            selected={new Date(end)}
            onChange={(date) => {
              if (!date) return
              handleDateChange(date.getTime(), DateName.END)
            }}
            wrapperClassName='w-100'
            dateFormat='Pp'
            showTimeSelect
            minDate={new Date(start)}
          />
        </div>

        <hr />
        <div className='form-group mb-2'>
          <label>Titulo y notas</label>
          <input
            type='text'
            className={`form-control ${inputAlert ? 'is-invalid' : ''}`}
            placeholder='Título del evento'
            autoComplete='off'
            name='title'
            value={title}
            onChange={handleTextChange}
          />
          <small id='emailHelp' className='form-text text-muted'>
            Una descripción corta
          </small>
        </div>

        <div className='form-group mb-2'>
          <textarea
            className='form-control'
            placeholder='Notas'
            rows={5}
            name='notes'
            value={notes}
            onChange={handleTextChange}
          ></textarea>
          <small id='emailHelp' className='form-text text-muted'>
            Información adicional
          </small>
        </div>

        <button type='submit' className='btn btn-outline-primary btn-block'>
          <i className='far fa-save'></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  )
}
