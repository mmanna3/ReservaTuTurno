import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import "react-day-picker/dist/style.css";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import ErrorPage from "./pages/ErrorPage.tsx";
import Home from "./pages/HomePage.tsx";
import Root from "./pages/RootPage.tsx";
import CrearCategoriaDeServicio from "./pages/categoria-de-servicio/CrearCategoriaDeServicio.tsx";
import ClientesPage from "./pages/clientes/ClientesPage.tsx";
import Configuracion from "./pages/configuracion/Configuracion.tsx";
import Agendas from "./pages/profesional/Agenda/Agendas.tsx";
import CrearProfesionalPage from "./pages/profesional/CrearProfesionalPage.tsx";
import ListaDeProfesionales from "./pages/profesional/ListaDeProfesionalesPage.tsx";
import ListaDeServicios from "./pages/servicio/ListaDeServiciosPage.tsx";
import Equipo from "./pages/servicio/components/Equipo.tsx";
import CrearServicio from "./pages/servicio/crear/Page.tsx";
import EditarServicio from "./pages/servicio/editar/Page.tsx";
import Turnos from "./pages/turnos/TurnosPage.tsx";
import CrearTurno from "./pages/turnos/crear/Page.tsx";
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
