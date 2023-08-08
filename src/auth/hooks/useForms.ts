import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function useForms() {
  const initialValuesLogin = {
    emailLogin: '',
    passwordLogin: '',
  }

  const initialValuesRegister = {
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

  const handleSubmitLogin = (values: typeof initialValuesLogin) => {
    console.log({ login: values })
  }

  const handleSubmitRegister = (values: typeof initialValuesRegister) => {
    console.log({ register: values })
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
