import { useLocation, useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error: unknown = useRouteError();
  const location = useLocation();

  return (
    <div className="max-w-7xl text-negro">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center">
        <div
          id="error-page"
          className="flex h-screen flex-col items-center justify-center gap-6"
        >
          <h1 className="text-4xl font-bold">Ay!</h1>
          <p>Disculpá, hubo un error inesperado.</p>
          <p>Avisale al administrador con este código:</p>
          <p className="text-grisclaro">{location.pathname}</p>
          <p className="text-grisclaro">
            <i>
              {(error as Error)?.message ||
                (error as { statusText?: string })?.statusText}
            </i>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
