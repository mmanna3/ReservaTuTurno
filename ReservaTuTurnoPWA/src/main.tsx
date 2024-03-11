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
import ListaDeProfesionales from "./pages/profesional/ListaDeProfesionalesPage.tsx";
import CrearServicio from "./pages/servicio/CrearServicioPage.tsx";
import ListaDeServicios from "./pages/servicio/ListaDeServiciosPage.tsx";

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
        path: "servicios/categoria/crear",
        element: <CrearCategoriaDeServicio />,
      },
      {
        path: "profesionales",
        element: <ListaDeProfesionales />,
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
  </React.StrictMode>
);
