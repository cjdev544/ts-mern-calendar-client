import Router from './router/Router'
import { AuthStatus } from '../types.d'
import { Provider } from 'react-redux'
import { store } from './store/store'
import 'sweetalert2/dist/sweetalert2.min.css'

export default function App() {
  const authStatus = AuthStatus.NOT_AUTHENTICATED

  return (
    <Provider store={store}>
      <Router isAuth={authStatus} />
    </Provider>
  )
}
