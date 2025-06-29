import React, { useState, useEffect } from "react";
import useCrearArt from "../hooks/useCreateArt"; // Asegurate de importar correctamente
import { useTheme } from '../utils/ThemeState';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const CargarCliente = () => {
  const { theme } = useTheme();
  const [form, setForm] = useState({
    nombreART: "",
    nombreAnalista: "",
    apellidoAnalista: "",
  });
  const navigate = useNavigate();

  const { crearArt, loading, error, success } = useCrearArt();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  crearArt(form, {
    onSuccess: () => {
      toast.success("Cliente creado con éxito");
      setForm({ nombreART: "", nombreAnalista: "", apellidoAnalista: "" });
      navigate("/listar/art");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};

  useEffect(() => {
    if (success) {
      setForm({ nombreART: "", nombreAnalista: "", apellidoAnalista: "" });
    }
  }, [success]);

  return (
    <main className="mt-5 p-5 col-lg-6 m-auto">
      <form onSubmit={handleSubmit}>
        <div className="d-flex align-items-center justify-content-between gap-2">
          <h1 className="h3 fw-normal">Nuevo Cliente</h1>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="nombreART"
            placeholder="Ej: prevencion ART"
            value={form.nombreART}
            onChange={handleChange}
            required
          />
          <label htmlFor="nombreART">Nombre ART</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="nombreAnalista"
            placeholder="Ej: Juan"
            value={form.nombreAnalista}
            onChange={handleChange}
            required
          />
          <label htmlFor="nombreAnalista">Nombre Analista</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="apellidoAnalista"
            placeholder="Ej: Perez"
            value={form.apellidoAnalista}
            onChange={handleChange}
            required
          />
          <label htmlFor="apellidoAnalista">Apellido Analista</label>
        </div>

        <button className="btn btn-warning float-end" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>
<ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === "dark" ? "dark" : "light"}
      />
    </main>
  );
};
