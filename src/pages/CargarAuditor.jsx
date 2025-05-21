import React, { useEffect, useState } from 'react';
import useCreateAuditor from '../hooks/useCreateAuditor'; // ajustá el path según tu estructura
import { useTheme } from '../utils/ThemeState';
import { ToastContainer, toast } from 'react-toastify';

export const CargarAuditor = () => {
  const { mutate, isSuccess,isPending, isError, error } = useCreateAuditor();
  console.log(isSuccess)
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    domicilio: '',
    cp: '',
    localidad: '',
  });

  console.log(formData);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  mutate(formData, {
    onSuccess: () => {
      setFormData({
      nombre: '',
      apellido: '',
      dni: '',
      domicilio: '',
      cp: '',
      localidad: '',
    })
      toast.success("Cliente creado con éxito");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};

  return (
    <main className="mt-5 p-5 col-lg-6 m-auto">
      <form onSubmit={handleSubmit}>
        <div className="d-flex align-items-center justify-content-between gap-2">
          <h1 className="h3 fw-normal">Cargar Auditor</h1>
        </div>

        <div className="d-flex gap-3">
          <div className="form-floating mb-3 col-md-6">
            <input
              type="text"
              className="form-control"
              id="nombre"
              placeholder="Ej: Juan"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            <label htmlFor="nombre">Ingrese nombre</label>
          </div>

          <div className="form-floating mb-3 col-md-6">
            <input
              type="text"
              className="form-control"
              id="apellido"
              placeholder="Ej: Pérez"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
            <label htmlFor="apellido">Ingrese Apellido</label>
          </div>
        </div>

        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="dni"
            placeholder="Ej: 22345678"
            value={formData.dni}
            onChange={handleChange}
            required
          />
          <label htmlFor="dni">Ingrese DNI</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="domicilio"
            placeholder="Ej: Calle 123"
            value={formData.domicilio}
            onChange={handleChange}
            required
          />
          <label htmlFor="domicilio">Ingrese Domicilio</label>
        </div>

        <div className="d-flex gap-3">
          <div className="form-floating mb-3 col-md-4">
            <input
              type="number"
              className="form-control"
              id="cp"
              placeholder="Ej: 1425"
              value={formData.cp}
              onChange={handleChange}
              required
            />
            <label htmlFor="cp">Ingrese CP</label>
          </div>

          <div className="form-floating mb-3 col-md-8">
            <input
              type="text"
              className="form-control"
              id="localidad"
              placeholder="Ej: Quilmes"
              value={formData.localidad}
              onChange={handleChange}
              required
            />
            <label htmlFor="localidad">Ingrese Localidad</label>
          </div>
        </div>

        {isError && <p className="alert alert-danger">{error.message}</p>}

        <button className="btn btn-warning float-end" type="submit" disabled={isPending}>
          {isPending ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
      <ToastContainer
               position="bottom-right"
               autoClose={1500}
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
