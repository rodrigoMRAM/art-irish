import { useState } from 'react'
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";  // Estilos de Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min"; // JavaScript de Bootstrap

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
function App() {


  return (
    <ThemeProvider>
    <Routes>
       <Route path="/" element={<Layout />}>
       <Route index element={<Home />} />
       {/* <Route path="home" element={<Home />} /> */}
       <Route path="/usuario/listar" element={<ListaUsuarios />} />
       <Route path="/siniestros/listar" element={<ListarSiniestros />} />
       <Route path="/registro" element={<Registro />} />
       <Route path="/siniestros" element={<CargarSiniestro />} />

        </Route>
       <Route path="/login" element={<Login />} />
    </Routes>
    </ThemeProvider>
  )
}

export default App
