export const LoadingRoute = [
  {
    path: '/',
    element: (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className='d-flex justify-content-center'>
          <div
            className='spinner-border text-primary'
            role='status'
            style={{ width: '4rem', height: '4rem' }}
          >
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      </div>
    ),
  },
]
