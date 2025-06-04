import React, { useState } from "react";
import useCreateAuditor from "../hooks/useCreateAuditor"; // Ajusta el path si es necesario
import { useTheme } from "../utils/ThemeState";
import { ToastContainer, toast } from "react-toastify";

export const CargarAuditor = () => {
  const { mutate, isSuccess, isPending, isError, error } = useCreateAuditor();
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    domicilio: "",
    cp: "",
    localidad: "",
  });

  // Estado para controlar si el formulario ha sido validado
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    // Verificar si el formulario es válido
    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    // Si es válido, enviar datos
    mutate(formData, {
      onSuccess: () => {
        setFormData({
          nombre: "",
          apellido: "",
          dni: "",
          domicilio: "",
          cp: "",
          localidad: "",
        });
        setValidated(false);
        toast.success("Auditor creado con éxito");
      },
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
    });
  };

  return (
    <main className="mt-5 p-5 col-lg-6 m-auto">
      <form
        className={`row g-3 needs-validation ${validated ? "was-validated" : ""}`}
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="col-md-4">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            placeholder="Ej: Juan"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Correcto.</div>
          <div className="invalid-feedback">ingresa el nombre.</div>
        </div>

        <div className="col-md-4">
          <label htmlFor="apellido" className="form-label">
            Apellido
          </label>
          <input
            type="text"
            className="form-control"
            id="apellido"
            placeholder="Ej: Pérez"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Correcto.</div>
          <div className="invalid-feedback">ingresa el apellido.</div>
        </div>

        <div className="col-md-4">
          <label htmlFor="dni" className="form-label">
            DNI
          </label>
          <div className="input-group has-validation">
            <span className="input-group-text" id="inputGroupPrepend">
              123
            </span>
            <input
              type="number"
              className="form-control"
              id="dni"
              placeholder="Ej: 22345678"
              value={formData.dni}
              onChange={handleChange}
              aria-describedby="inputGroupPrepend"
              required
            />
            <div className="invalid-feedback">ingresa un DNI válido.</div>
          </div>
        </div>

        <div className="col-md-6">
          <label htmlFor="domicilio" className="form-label">
            Domicilio
          </label>
          <input
            type="text"
            className="form-control"
            id="domicilio"
            placeholder="Ej: Calle 123"
            value={formData.domicilio}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">ingresa el domicilio.</div>
        </div>

        <div className="col-md-3">
          <label htmlFor="localidad" className="form-label">
            Localidad
          </label>
          <input
            type="text"
            className="form-control"
            id="localidad"
            placeholder="Ej: Quilmes"
            value={formData.localidad}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">ingresa la localidad.</div>
        </div>

        <div className="col-md-3">
          <label htmlFor="cp" className="form-label">
            CP
          </label>
          <input
            type="number"
            className="form-control"
            id="cp"
            placeholder="Ej: 1425"
            value={formData.cp}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">ingresa el CP.</div>
        </div>

        <div className="col-12">
          <button
            className="btn btn-warning float-end"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>

      <ToastContainer
        position="bottom-right"
        autoClose={3500}
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
