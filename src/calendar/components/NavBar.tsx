export default function NavBar() {
  return (
    <nav className='navbar navbar-dark bg-dark mb-4 px-4'>
      <span className='navbar-brand'>
        <i className='fas fa-calendar-alt mr-2'></i>
        &nbsp; CJDev544
      </span>
      <button
        className='btn btn-outline-danger'
        type='button'
        onClick={() => {}}
      >
        <i className='fas fa-sign-out-alt'></i>
        <span>Salir</span>
      </button>
    </nav>
  )
}
