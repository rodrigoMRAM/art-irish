import "bootstrap/dist/css/bootstrap.min.css"; // Estilos de Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min"; // JavaScript de Bootstrap
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import { PrivateRoute } from "./components/routes/PrivateRoutes";
import { Layout } from "./Layout";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./utils/ThemeState";
import { Login } from "./pages/Login";
import { Home } from "./components/Home/Home";
import { ListaUsuarios } from "./pages/ListaUsuarios";
import { ListarSiniestros } from "./pages/ListarSiniestros";
import { Registro } from "./pages/Registro";
import { CargarSiniestro } from "./pages/CargarSiniestro";
import { CargarAsegurado } from "./pages/CargarAsegurado";
import { EditarSiniestro } from "./pages/EditarSiniestro";
import { CargarAuditor } from "./pages/CargarAuditor";
import { ListarAuditor } from "./pages/ListarAuditor";
import { Resumen } from "./pages/Resumen";
import { ListarArt } from "./pages/ListarArt";
import { CargarCliente } from "./pages/CargarCliente";
import { ListarAsegurados } from "./pages/ListarAsegurados";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<Layout />}>
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/usuario/listar"
                element={
                  <PrivateRoute>
                    <ListaUsuarios />
                  </PrivateRoute>
                }
              />
              <Route
                path="/siniestros/listar"
                element={
                  <PrivateRoute>
                    <ListarSiniestros />
                  </PrivateRoute>
                }
              />
              <Route
                path="/registro"
                element={
                  <PrivateRoute>
                    <Registro />
                  </PrivateRoute>
                }
              />
              <Route
                path="/siniestros"
                element={
                  <PrivateRoute>
                    <CargarSiniestro />
                  </PrivateRoute>
                }
              />
              <Route
                path="/siniestros/editar"
                element={
                  <PrivateRoute>
                    <EditarSiniestro />
                  </PrivateRoute>
                }
              />
              <Route
                path="/resumen"
                element={
                  <PrivateRoute>
                    <Resumen />
                  </PrivateRoute>
                }
              />
              <Route
                path="/asegurado"
                element={
                  <PrivateRoute>
                    <CargarAsegurado />
                  </PrivateRoute>
                }
              />
              <Route
                path="/listar/asegurado"
                element={
                  <PrivateRoute>
                    <ListarAsegurados />
                  </PrivateRoute>
                }
              />
              <Route
                path="/auditor"
                element={
                  <PrivateRoute>
                    <CargarAuditor />
                  </PrivateRoute>
                }
              />
              <Route
                path="/listar/auditor"
                element={
                  <PrivateRoute>
                    <ListarAuditor />
                  </PrivateRoute>
                }
              />
              <Route
                path="/listar/art"
                element={
                  <PrivateRoute>
                    <ListarArt />
                  </PrivateRoute>
                }
              />
              <Route
                path="/cliente"
                element={
                  <PrivateRoute>
                    <CargarCliente />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </PersistGate>
    </Provider>
    </QueryClientProvider>
  );
}

export default App;
