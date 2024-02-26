import { useRouteError } from 'react-router-dom'

const ErrorPage: React.FC = () => {
  const error: unknown = useRouteError();

  return (
    <div className="max-w-7xl">
      <div className="absolute text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <div
          id='error-page'
          className='flex flex-col gap-6 justify-center items-center h-screen'
        >
          <h1 className='text-4xl font-bold'>Ay!</h1>
          <p>Disculpá, hubo un error inesperado.</p>
          <p>Avisale al administrador con este código:</p>
          <p className='text-slate-400'>
            <i>
              {(error as Error)?.message ||
                (error as { statusText?: string })?.statusText}
            </i>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage