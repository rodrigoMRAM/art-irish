import React, { useState } from "react";
import useCreateAsegurado from "../hooks/useCreateAsegurado";
import { ToastContainer, toast } from "react-toastify";
import { useTheme } from "../utils/ThemeState";

export const CargarAsegurado = () => {
  const { theme } = useTheme();
  const initialFormState = {
    nombre: "",
    cuit: "",
    telefono: "",
    telefono2: "",
    email: "",
    empresa: "",
    prestadorMedico: "",
    contactosAsegurado: [
      {
        nombre: "",
        apellido: "",
        dni: "",
        sector: "",
        telefono: "",
        telefono2: "",
        email: "",
      },
    ],
  };
  const [form, setForm] = useState(initialFormState);
  const { crearAsegurado, isLoading, isSuccess, isError, error } =
    useCreateAsegurado();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleContactoChange = (e, index) => {
    const { id, value } = e.target;
    setForm((prev) => {
      const contactos = [...prev.contactosAsegurado];
      contactos[index][id] = value;
      return { ...prev, contactosAsegurado: contactos };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await crearAsegurado({
        ...form,
        cuit: Number(form.cuit),
        contactosAsegurado: form.contactosAsegurado.map((c) => ({
          ...c,
          dni: Number(c.dni),
        })),
      });
      setForm(initialFormState);
      toast.success("Asegurado creado con éxito");
    } catch (error) {
      toast.error("Ocurrió un error al crear el asegurado");
      console.error(error);
    }
  };

  return (
    <main className="mt-5 p-5 col-lg-6 m-auto">
      <form onSubmit={handleSubmit}>
        <div className="d-flex align-items-center justify-content-between gap-2">
          <h1 className="h3 fw-normal">Cargar Asegurado</h1>
        </div>
        <div className="d-flex gap-3">
          <div className="form-floating mb-3 col-md-6">
            <input
              type="text"
              className="form-control"
              id="nombre"
              onChange={handleChange}
              required
            />
            <label htmlFor="nombre">Nombre</label>
          </div>
          <div className="form-floating mb-3 col-md-6">
            <input
              type="text"
              className="form-control"
              id="cuit"
              onChange={handleChange}
              required
            />
            <label htmlFor="cuit">CUIT</label>
          </div>
        </div>
        <div className="d-flex gap-3">
          <div className="form-floating mb-3 col-md-6">
            <input
              type="tel"
              className="form-control"
              id="telefono"
              onChange={handleChange}
              required
            />
            <label htmlFor="telefono">Teléfono</label>
          </div>
          <div className="form-floating mb-3 col-md-6">
            <input
              type="tel"
              className="form-control"
              id="telefono2"
              onChange={handleChange}
            />
            <label htmlFor="telefono2">Teléfono (opcional)</label>
          </div>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={handleChange}
            required
          />
          <label htmlFor="email">E-mail</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="empresa"
            onChange={handleChange}
            required
          />
          <label htmlFor="empresa">Razón social</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="empresa"
            onChange={handleChange}
            required
          />
          <label htmlFor="empresa">Nombre de fantasía</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="prestadorMedico"
            onChange={handleChange}
            required
          />
          <label htmlFor="prestadorMedico">Ingrese prestador médico</label>
        </div>
        <button className="btn btn-warning float-end" type="submit">
          Agregar
        </button>

        <h5 className="mt-4">Contacto del Asegurado</h5>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="nombre"
            onChange={(e) => handleContactoChange(e, 0)}
            required
          />
          <label htmlFor="nombre">Nombre</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="apellido"
            onChange={(e) => handleContactoChange(e, 0)}
            required
          />
          <label htmlFor="apellido">Apellido</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="dni"
            onChange={(e) => handleContactoChange(e, 0)}
            required
          />
          <label htmlFor="dni">DNI</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="sector"
            onChange={(e) => handleContactoChange(e, 0)}
            required
          />
          <label htmlFor="sector">Sector</label>
        </div>
        <div className="d-flex gap-3">
          <div className="form-floating mb-3 col-md-6">
            <input
              type="tel"
              className="form-control"
              id="telefono"
              onChange={(e) => handleContactoChange(e, 0)}
              required
            />
            <label htmlFor="telefono">Teléfono</label>
          </div>
          <div className="form-floating mb-3 col-md-6">
            <input
              type="tel"
              className="form-control"
              id="telefono2"
              onChange={(e) => handleContactoChange(e, 0)}
            />
            <label htmlFor="telefono2">Teléfono alternativo</label>
          </div>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={(e) => handleContactoChange(e, 0)}
            required
          />
          <label htmlFor="email">Email</label>
        </div>

        {isError && <div className="alert alert-danger">{error.message}</div>}

        <button
          className="btn btn-warning float-end"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Guardando..." : "Guardar"}
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
