import useAuthState from '../../hooks/useAuthState'

export default function NavBar() {
  const { auth, logoutUser } = useAuthState()

  return (
    <nav className='navbar navbar-dark bg-dark mb-4 px-4'>
      <span className='navbar-brand'>
        <i className='fas fa-calendar-alt mr-2'></i>
        &nbsp; {auth.user?.name}
      </span>
      <button
        className='btn btn-outline-danger'
        type='button'
        onClick={logoutUser}
      >
        <i className='fas fa-sign-out-alt'></i>
        <span>Salir</span>
      </button>
    </nav>
  )
}
