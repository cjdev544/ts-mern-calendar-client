/* eslint-disable indent */
import useForms from '../hooks/useForms'
import './AuthenticationPage.css'

export default function AuthenticationPage() {
  const { formikLogin, formikRegister } = useForms()

  return (
    <div className='container login-container'>
      <div className='row'>
        <div className='col-md-6 login-form-1'>
          <h3>Ingreso</h3>
          <form onSubmit={formikLogin.handleSubmit}>
            <div className='form-group mb-2'>
              <input
                type='text'
                className='form-control'
                placeholder='Correo'
                name='emailLogin'
                value={formikLogin.values.emailLogin}
                onChange={formikLogin.handleChange}
                onBlur={formikLogin.handleBlur}
              />
              {formikLogin.touched.emailLogin &&
                formikLogin.errors.emailLogin && (
                  <div style={{ color: 'red', fontSize: '12px' }}>
                    {formikLogin.errors.emailLogin}
                  </div>
                )}
            </div>
            <div className='form-group mb-2'>
              <input
                type='password'
                className='form-control'
                placeholder='Contraseña'
                name='passwordLogin'
                value={formikLogin.values.passwordLogin}
                onChange={formikLogin.handleChange}
                onBlur={formikLogin.handleBlur}
              />
              {formikLogin.touched.passwordLogin &&
                formikLogin.errors.passwordLogin && (
                  <div style={{ color: 'red', fontSize: '12px' }}>
                    {formikLogin.errors.passwordLogin}
                  </div>
                )}
            </div>
            <div className='form-group mb-2'>
              <input type='submit' className='btnSubmit' value='Login' />
            </div>
          </form>
        </div>

        <div className='col-md-6 login-form-2'>
          <h3>Registro</h3>
          <form onSubmit={formikRegister.handleSubmit}>
            <div className='form-group mb-2'>
              <input
                type='text'
                className='form-control'
                placeholder='Nombre'
                name='nameRegister'
                value={formikRegister.values.nameRegister}
                onChange={formikRegister.handleChange}
                onBlur={formikRegister.handleBlur}
              />
              {formikRegister.touched.nameRegister &&
                formikRegister.errors.nameRegister && (
                  <div
                    style={{
                      color: 'red',
                      fontSize: '12px',
                    }}
                  >
                    {formikRegister.errors.nameRegister}
                  </div>
                )}
            </div>
            <div className='form-group mb-2'>
              <input
                type='email'
                className='form-control'
                placeholder='Correo'
                name='emailRegister'
                value={formikRegister.values.emailRegister}
                onChange={formikRegister.handleChange}
                onBlur={formikRegister.handleBlur}
              />
              {formikRegister.touched.emailRegister &&
                formikRegister.errors.emailRegister && (
                  <div style={{ color: 'red', fontSize: '12px' }}>
                    {formikRegister.errors.emailRegister}
                  </div>
                )}
            </div>
            <div className='form-group mb-2'>
              <input
                type='password'
                className='form-control'
                placeholder='Contraseña'
                name='passwordRegister'
                value={formikRegister.values.passwordRegister}
                onChange={formikRegister.handleChange}
                onBlur={formikRegister.handleBlur}
              />
              {formikRegister.touched.passwordRegister &&
                formikRegister.errors.passwordRegister && (
                  <div style={{ color: 'red', fontSize: '12px' }}>
                    {formikRegister.errors.passwordRegister}
                  </div>
                )}
            </div>

            <div className='form-group mb-2'>
              <input
                type='password'
                className='form-control'
                placeholder='Repita la contraseña'
                name='repeatPasswordRegister'
                value={formikRegister.values.repeatPasswordRegister}
                onChange={formikRegister.handleChange}
                onBlur={formikRegister.handleBlur}
              />
              {formikRegister.touched.repeatPasswordRegister &&
                formikRegister.errors.repeatPasswordRegister && (
                  <div style={{ color: 'red', fontSize: '12px' }}>
                    {formikRegister.errors.repeatPasswordRegister}
                  </div>
                )}
            </div>

            <div className='form-group mb-2'>
              <input type='submit' className='btnSubmit' value='Crear cuenta' />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
