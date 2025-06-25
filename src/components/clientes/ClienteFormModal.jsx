// AuditorFormModal.jsx
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";

/**
 * Props:
 * - mode: "create" | "edit"
 * - show: boolean
 * - initialData: { nombre, apellido, dni, domicilio, cp, localidad } (para editar)
 * - onCancel: fn() cuando se cierra sin guardar
 * - onSubmit: fn(formData) al enviar (creación o edición)
 * - isSubmitting: boolean (indica si está procesando)
 * - theme: "light" | "dark" (para ToastContainer)
 */
export const ClienteFormModal = ({
  mode,
  show,
  initialData,
  onCancel,
  onSubmit,
  isSubmitting,
  theme,
}) => {
  // Mantiene el mismo orden y estilos que en la sección original
  const [formData, setFormData] = useState({
    nombreART: "",
    nombreAnalista: "",
    apellidoAnalista: "",
  });
  const [validated, setValidated] = useState(false);

  // Cuando cambie `initialData` (solo en modo "edit"), se rellena el formulario
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        nombreART: initialData.nombreART || "",
        nombreAnalista: initialData.nombreAnalista || "",
        apellidoAnalista: initialData.apellidoAnalista || "",
      });
      setValidated(false);
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    // Validación nativa de Bootstrap
    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    // Si es válido, invocar callback
    onSubmit(formData);
    setFormData({
    nombreART: "",
    nombreAnalista: "",
    apellidoAnalista: "",
  });
  };

  if (!show) return null;

  return (
    <div className="modal show d-block">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow">
          <div className="modal-header">
            <h5>{mode === "create" ? "Nuevo cliente" : "Editar cliente"}</h5>
            <button className="btn-close" onClick={(e) => {
    e.preventDefault();
    setFormData({
      nombreART: "",
      nombreAnalista: "",
      apellidoAnalista: "",
    });
    onCancel();
  }} />
          </div>

          <form
            onSubmit={handleSubmit}
            className={`row g-3 needs-validation ${
              validated ? "was-validated" : ""
            }`}
            noValidate
          >
            <div className="modal-body">
    <div className="row g-3">
      <div className="col-12">
        <label htmlFor="nombreART" className="form-label">
          Nombre ART
        </label>
        <input
          type="text"
          className="form-control"
          id="nombreART"
          placeholder="Ej: Seguros ART"
          value={formData.nombreART}
          onChange={handleChange}
          required
        />
        <div className="invalid-feedback">Ingresa el nombre de la ART.</div>
      </div>
      <div className="col-md-6">
        <label htmlFor="nombreAnalista" className="form-label">
          Nombre Analista
        </label>
        <input
          type="text"
          className="form-control"
          id="nombreAnalista"
          placeholder="Ej: Juan"
          value={formData.nombreAnalista}
          onChange={handleChange}
          required
        />
        <div className="invalid-feedback">Ingresa el nombre del analista.</div>
      </div>
      <div className="col-md-6">
        <label htmlFor="apellidoAnalista" className="form-label">
          Apellido Analista
        </label>
        <input
          type="text"
          className="form-control"
          id="apellidoAnalista"
          placeholder="Ej: Pérez"
          value={formData.apellidoAnalista}
          onChange={handleChange}
          required
        />
        <div className="invalid-feedback">Ingresa el apellido del analista.</div>
      </div>
    </div>
  </div>

            <div className="modal-footer">
              <button className="btn btn-secondary"  onClick={(e) => {
    e.preventDefault();
    setFormData({
      nombreART: "",
      nombreAnalista: "",
      apellidoAnalista: "",
    });
    onCancel();
  }}>
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-warning"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? mode === "create"
                    ? "Guardando..."
                    : "Actualizando..."
                  : mode === "create"
                  ? "Guardar"
                  : "Guardar cambios"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

ClienteFormModal.propTypes = {
  mode: PropTypes.oneOf(["create", "edit"]).isRequired,
  show: PropTypes.bool.isRequired,
  initialData: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  theme: PropTypes.oneOf(["light", "dark"]).isRequired,
};
ClienteFormModal.defaultProps = {
  initialData: null,
  isSubmitting: false,
};
