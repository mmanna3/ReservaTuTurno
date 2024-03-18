import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import "./index.css";
import ErrorPage from "./pages/ErrorPage.tsx";
import Home from "./pages/HomePage.tsx";
import Root from "./pages/RootPage.tsx";
import CrearCategoriaDeServicio from "./pages/categoria-de-servicio/CrearCategoriaDeServicio.tsx";
import CrearProfesionalPage from "./pages/profesional/CrearProfesionalPage.tsx";
import ListaDeProfesionales from "./pages/profesional/ListaDeProfesionalesPage.tsx";
import ListaDeServicios from "./pages/servicio/ListaDeServiciosPage.tsx";
import Equipo from "./pages/servicio/crear/Equipo.tsx";
import CrearServicio from "./pages/servicio/crear/Page.tsx";

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
