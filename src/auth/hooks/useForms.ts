import { useFormik } from 'formik'
import * as Yup from 'yup'
import useAuthState from '../../hooks/useAuthState'
import {
  type CalendarFormLogin,
  type CalendarFormRegister,
} from '../../../types.d'

export default function useForms() {
  const { loginUser, registerUser } = useAuthState()

  const initialValuesLogin: CalendarFormLogin = {
    emailLogin: '',
    passwordLogin: '',
  }

  const initialValuesRegister: CalendarFormRegister = {
    nameRegister: '',
    emailRegister: '',
    passwordRegister: '',
    repeatPasswordRegister: '',
  }

  const validationSchemaLogin = Yup.object({
    emailLogin: Yup.string()
      .required('El correo es requerido')
      .email('El correo no es válido'),
    passwordLogin: Yup.string().required('La contraseña es obligatoria'),
  })

  const validationSchemaRegister = Yup.object({
    nameRegister: Yup.string().required('El nombre es obligatorio'),
    emailRegister: Yup.string()
      .required('El correo es requerido')
      .email('El correo no es válido'),
    passwordRegister: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('campo requerido'),
    repeatPasswordRegister: Yup.string()
      .oneOf([Yup.ref('passwordRegister')], 'Las contraseñas no coinciden')
      .nullable()
      .required('Campo requerido'),
  })

  const handleSubmitLogin = (values: CalendarFormLogin) => {
    loginUser(values)
  }

  const handleSubmitRegister = (values: CalendarFormRegister) => {
    registerUser(values)
  }

  const formikLogin = useFormik({
    initialValues: initialValuesLogin,
    validationSchema: validationSchemaLogin,
    onSubmit: handleSubmitLogin,
  })

  const formikRegister = useFormik({
    initialValues: initialValuesRegister,
    validationSchema: validationSchemaRegister,
    onSubmit: handleSubmitRegister,
  })

  return {
    formikLogin,
    formikRegister,
  }
}
