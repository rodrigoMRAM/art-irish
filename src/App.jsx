import "bootstrap/dist/css/bootstrap.min.css";  // Estilos de Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min"; // JavaScript de Bootstrap
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import './App.css'
import { Layout } from './Layout';
import { BrowserRouter as Router, Routes, Route }  from 'react-router-dom';
import { ThemeProvider } from './utils/ThemeState';
import { Login } from './pages/Login';
import { Home } from './components/Home/Home';
import { ListaUsuarios } from './pages/ListaUsuarios';
import { ListarSiniestros } from './pages/ListarSiniestros';
import { Registro } from './pages/Registro';
import { CargarSiniestro } from './pages/CargarSiniestro';
import { CargarAsegurado } from './pages/CargarAsegurado';
import { EditarSiniestro } from './pages/EditarSiniestro';
function App() {


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<Layout />}>
              <Route path="/home" element={<Home />} /> 
              <Route path="/usuario/listar" element={<ListaUsuarios />} />
              <Route path="/siniestros/listar" element={<ListarSiniestros />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/siniestros" element={<CargarSiniestro />} />
              <Route path="/siniestros/editar" element={<EditarSiniestro />} />
              <Route path="/asegurado" element={<CargarAsegurado />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
