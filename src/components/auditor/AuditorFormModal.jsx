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
export const AuditorFormModal = ({
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
    nombre: "",
    apellido: "",
    dni: "",
    domicilio: "",
    cp: "",
    localidad: "",
  });
  const [validated, setValidated] = useState(false);

  // Cuando cambie `initialData` (solo en modo "edit"), se rellena el formulario
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        nombre: initialData.nombre || "",
        apellido: initialData.apellido || "",
        dni: initialData.dni || "",
        domicilio: initialData.domicilio || "",
        cp: initialData.cp || "",
        localidad: initialData.localidad || "",
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
  };

  if (!show) return null;

  return (
    <div className="modal show d-block">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow">
          <div className="modal-header">
            <h5>{mode === "create" ? "Nuevo Auditor" : "Editar Auditor"}</h5>
            <button className="btn-close" onClick={onCancel} />
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
                {[
                  {
                    id: "nombre",
                    label: "Nombre",
                    type: "text",
                    placeholder: "Ej: Juan",
                  },
                  {
                    id: "apellido",
                    label: "Apellido",
                    type: "text",
                    placeholder: "Ej: Pérez",
                  },
                  {
                    id: "dni",
                    label: "DNI",
                    type: "number",
                    placeholder: "Ej: 22345678",
                  },
                  {
                    id: "domicilio",
                    label: "Domicilio",
                    type: "text",
                    placeholder: "Ej: Calle 123",
                  },
                  {
                    id: "localidad",
                    label: "Localidad",
                    type: "text",
                    placeholder: "Ej: Quilmes",
                  },
                  {
                    id: "cp",
                    label: "CP",
                    type: "number",
                    placeholder: "Ej: 1425",
                  },
                ].map(({ id, label, type, placeholder }) => (
                  <div
                    className={`col-md-${
                      id === "domicilio"
                        ? "6"
                        : id === "cp" || id === "localidad"
                        ? "3"
                        : "4"
                    }`}
                    key={id}
                  >
                    <label htmlFor={id} className="form-label">
                      {label}
                    </label>
                    {id === "dni" ? (
                      <div className="input-group has-validation">
                        <span
                          className="input-group-text"
                          id="inputGroupPrepend"
                        >
                          123
                        </span>
                        <input
                          type={type}
                          className="form-control"
                          id={id}
                          placeholder={placeholder}
                          value={formData[id]}
                          onChange={handleChange}
                          aria-describedby="inputGroupPrepend"
                          required
                        />
                        <div className="invalid-feedback">
                          Ingresa un {label} válido.
                        </div>
                      </div>
                    ) : (
                      <>
                        <input
                          type={type}
                          className="form-control"
                          id={id}
                          placeholder={placeholder}
                          value={formData[id]}
                          onChange={handleChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Ingresa {label.toLowerCase()}.
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onCancel}>
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
    </div>
  );
};

AuditorFormModal.propTypes = {
  mode: PropTypes.oneOf(["create", "edit"]).isRequired,
  show: PropTypes.bool.isRequired,
  initialData: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  theme: PropTypes.oneOf(["light", "dark"]).isRequired,
};
AuditorFormModal.defaultProps = {
  initialData: null,
  isSubmitting: false,
};
