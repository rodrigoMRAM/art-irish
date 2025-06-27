import React, { useState, useRef, useEffect } from "react";
import useCreateAsegurado from "../hooks/useCreateAsegurado";
import { ToastContainer, toast } from "react-toastify";
import { useTheme } from "../utils/ThemeState";

export const CargarAsegurado = () => {
  const { theme } = useTheme();
  const {
    crearAsegurado,
    crearAseguradoAsync,
    isLoading,
    isError,
    error,
  } = useCreateAsegurado();

  const formRef = useRef(null);
  const contactFormRef = useRef(null);

  // --- Estado principal ---
  const [form, setForm] = useState({
    nombre: "",
    cuit: "",
    telefono: "",
    telefono2: "",
    email: "",
    empresa: "",
    nombreFantasia: "",
    prestadorMedico: "",
  });
  const [validatedMain, setValidatedMain] = useState(false);

  // --- Estado de contactos ---
  const emptyContact = {
    nombre: "",
    apellido: "",
    dni: "",
    sector: "",
    telefono: "",
    telefono2: "",
    email: "",
  };
  const [contactos, setContactos] = useState([]);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contact, setContact] = useState(emptyContact);
  const [validatedContact, setValidatedContact] = useState(false);

  // Limpieza de validaciones al montar
  useEffect(() => {
    formRef.current?.classList.remove("was-validated");
    contactFormRef.current?.classList.remove("was-validated");
  }, []);

  // Handlers for main form
  const handleMainChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleMainSubmit = (e) => {
    e.preventDefault();
    const f = formRef.current;
    // valida campos + al menos un contacto
    if (!f.checkValidity() || contactos.length < 1) {
      setValidatedMain(true);
      return;
    }
    crearAsegurado(
      {
        ...form,
        contactosAsegurado: contactos.map((c) => ({
          ...c,
          dni: Number(c.dni),
        })),
      },
      {
        onSuccess: () => {
          toast.success("Asegurado creado con éxito");
          // reset todo
          setForm({
            nombre: "",
            cuit: "",
            telefono: "",
            telefono2: "",
            email: "",
            empresa: "",
            prestadorMedico: "",
          });
          setContactos([]);
          setValidatedMain(false);
          f.classList.remove("was-validated");
        },
        onError: (err) => {
          toast.error("Error al crear asegurado: " + err.message);
        },
      }
    );
  };

  // Handlers for contact modal
  const openContactModal = () => {
    setContact(emptyContact);
    setValidatedContact(false);
    setShowContactModal(true);
  };
  const closeContactModal = () => setShowContactModal(false);

  const handleContactChange = (e) => {
    const { id, value } = e.target;
    setContact((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddContact = (e) => {
    e.preventDefault();
    const f = contactFormRef.current;
    if (!f.checkValidity()) {
      setValidatedContact(true);
      return;
    }
    setContactos((prev) => [...prev, contact]);
    setShowContactModal(false);
  };
  const handleRemoveContact = (indexToRemove) => {
    setContactos((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <main className="mt-5 p-5 col-lg-8 mx-auto">
      <h2 className="h3 mb-4">Cargar Asegurado</h2>

      <form
        ref={formRef}
        className={`needs-validation ${validatedMain ? "was-validated" : ""}`}
        noValidate
        onSubmit={handleMainSubmit}
      >
        <div className="row g-3">
          {/* Campos principales */}
          {[
            { id: "nombre", label: "Nombre", type: "text" },
            { id: "cuit", label: "CUIT", type: "text" },
            { id: "telefono", label: "Teléfono", type: "tel" },
            {
              id: "telefono2",
              label: "Teléfono 2",
              type: "tel",
              required: false,
            },
            { id: "email", label: "E-mail", type: "email" },
            { id: "empresa", label: "Razón Social", type: "text" },
            { id: "nombreFantasia", label: "Nombre de fantasía", type: "text" },
            { id: "prestadorMedico", label: "Prestador Médico", type: "text" },
          ].map(({ id, label, type, required = true }) => (
            <div className="col-md-6" key={id}>
              <div className="form-floating">
                <input
                  type={type}
                  className="form-control"
                  id={id}
                  placeholder={label}
                  value={form[id]}
                  onChange={handleMainChange}
                  required={required}
                />
                <label htmlFor={id}>{label}</label>
                <div className="invalid-feedback">
                  Por favor ingresa {label.toLowerCase()}.
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sección contactos */}
        <div className="mt-4">
          <h5>
            Contactos{" "}
            <button
              type="button"
              className="btn btn-sm btn-outline-warning ms-3"
              onClick={openContactModal}
            >
              Agregar contacto
            </button>
          </h5>
          {validatedMain && contactos.length < 1 && (
            <div className="text-danger mb-2">
              Debes agregar al menos un contacto.
            </div>
          )}
          <ul className="list-group">
            {contactos.length === 0 ? (
              <li className="list-group-item text-muted">
                Agrega al menos un contacto.
              </li>
            ) : (
              contactos.map((c, idx) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={idx}
                >
                  <div>
                    {c.nombre} {c.apellido} – DNI: {c.dni} – Tel: {c.telefono} –{" "}
                    {c.sector}
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleRemoveContact(idx)}
                  >
                    &times;
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Botón guardar */}
        <div className="d-flex justify-content-end mt-4">
          <button
            className="btn btn-warning"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Guardando..." : "Guardar Asegurado"}
          </button>
        </div>

        {isError && (
          <div className="alert alert-danger mt-3">{error.message}</div>
        )}
      </form>

      {/* Modal de contacto */}
      {showContactModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <form
                ref={contactFormRef}
                className={`needs-validation ${
                  validatedContact ? "was-validated" : ""
                }`}
                noValidate
                onSubmit={handleAddContact}
              >
                <div className="modal-header">
                  <h5 className="modal-title">Agregar Contacto</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeContactModal}
                  />
                </div>
                <div className="modal-body">
                  <div className="row g-3">
                    {[
                      { id: "nombre", label: "Nombre", type: "text" },
                      { id: "apellido", label: "Apellido", type: "text" },
                      { id: "dni", label: "DNI", type: "text" },
                      { id: "sector", label: "Sector", type: "text" },
                      { id: "telefono", label: "Teléfono", type: "tel" },
                      {
                        id: "telefono2",
                        label: "Teléfono 2",
                        type: "tel",
                        required: false,
                      },
                      { id: "email", label: "Email", type: "email" },
                    ].map(({ id, label, type, required = true }) => (
                      <div className="col-md-6" key={id}>
                        <div className="form-floating">
                          <input
                            type={type}
                            className="form-control"
                            id={id}
                            placeholder={label}
                            value={contact[id]}
                            onChange={handleContactChange}
                            required={required}
                          />
                          <label htmlFor={id}>{label}</label>
                          <div className="invalid-feedback">
                            Por favor ingresa {label.toLowerCase()}.
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeContactModal}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-warning">
                    Agregar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme={theme === "dark" ? "dark" : "light"}
      />
    </main>
  );
};
