import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import "react-day-picker/dist/style.css";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Agendas from "./pages/agendas/page.tsx";
import CrearCategoriaDeServicio from "./pages/categorias-de-servicio/crear.tsx";
import ClientesPage from "./pages/clientes/page.tsx";
import Configuracion from "./pages/configuracion/page.tsx";
import ErrorPage from "./pages/error-page.tsx";
import Home from "./pages/home-page.tsx";
import CrearProfesionalPage from "./pages/profesionales/crear.tsx";
import ListaDeProfesionales from "./pages/profesionales/lista.tsx";
import Root from "./pages/root-page.tsx";
import Equipo from "./pages/servicios/componentes/equipo.tsx";
import CrearServicio from "./pages/servicios/crear.tsx";
import EditarServicio from "./pages/servicios/editar.tsx";
import ListaDeServicios from "./pages/servicios/lista.tsx";
import CrearTurno from "./pages/turnos/crear.tsx";
import Turnos from "./pages/turnos/page.tsx";
import ErrorBoundary from "./ui/error-boundary.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "servicios",
        element: <ListaDeServicios />,
      },
      {
        path: "servicios/crear",
        element: <CrearServicio />,
      },
      {
        path: "servicios/:id/editar",
        element: <EditarServicio />,
      },
      {
        path: "servicios/:id/agregarprofesionales",
        element: <Equipo />,
      },
      {
        path: "servicios/categoria/crear",
        element: <CrearCategoriaDeServicio />,
      },
      {
        path: "profesionales",
        element: <ListaDeProfesionales />,
      },
      {
        path: "profesionales/crear",
        element: <CrearProfesionalPage />,
      },
      {
        path: "profesionales/:id/agenda",
        element: <Agendas />,
      },
      {
        path: "configuracion",
        element: <Configuracion />,
      },
      {
        path: "turnos",
        element: <Turnos />,
      },
      {
        path: "turnos/crear",
        element: <CrearTurno />,
      },
      {
        path: "clientes",
        element: <ClientesPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
