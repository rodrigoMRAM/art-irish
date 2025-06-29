import React, { useState, useRef, useEffect } from "react";
import { useCrearSiniestro } from "../hooks/useSiniestro";
import { ToastContainer, toast } from "react-toastify";
import { useTheme } from "../utils/ThemeState";
import { useArts } from "../hooks/useGetArt";
import { useCreateTrabajador } from "../hooks/useCreateTrabajador";
import { useDeleteTrabajador } from "../hooks/useDeleteTrabajador"; // asegurate de tener este hook

const initialFormData = {
  numStro: "",
  fechaYHoraStro: "",
  artId: "",
  tipoStro: "",
  lugar_direccion: "",
  lugar_entrecalles: "",
  localidad: "",
  provincia: "",
  mechanicaHecho: "",
  gravedad: "",
  tipoInvestigacion: "",
  nombrePrestadorMedico: "",
  lesiones: "",
  patologiasInculpables: "",
  observaciones: "",
};

const initialTrabajador = {
  dni: "",
  nombre: "",
  apellido: "",
  telefono: "",
  telefono2: "",
  email: "",
  calle: "",
  numero: "",
  piso: "",
  depto: "",
  cp: "",
  localidad: "",
  provincia: "",
};

export const CargarSiniestro = () => {
  const {
    data: arts = [],
    isLoading: artsLoading,
    error: artsError,
  } = useArts();
  const { mutateAsync: createTrabajador } = useCreateTrabajador();
  const { mutateAsync: createSiniestro, isLoading: loading } = useCrearSiniestro();
  const { mutateAsync: deleteTrabajador } = useDeleteTrabajador();

  const { theme } = useTheme();

  const [formData, setFormData] = useState(initialFormData);
  const [trabajadorData, setTrabajadorData] = useState(initialTrabajador);
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);

  // Reset validation when modal/form mounts
  useEffect(() => {
    setValidated(false);
    formRef.current?.classList.remove("was-validated");
  }, []);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    if (id.startsWith("trabajador_")) {
      const key = id.replace("trabajador_", "");
      setTrabajadorData((prev) => ({
        ...prev,
        [key]: val,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: val,
      }));
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const form = formRef.current;
  if (!form.checkValidity()) {
    setValidated(true);
    return;
  }
  let trabajador = null;
  try {
    trabajador = await createTrabajador(trabajadorData);
    await createSiniestro({
      formData: { ...formData, trabajadorId: trabajador.id },
    });
    toast.success("Siniestro y trabajador creados con éxito");
    setFormData(initialFormData);
    setTrabajadorData(initialTrabajador);
    setValidated(false);
    form.classList.remove("was-validated");
  } catch (err) {
    if (trabajador && trabajador.id) {
      try {
        await deleteTrabajador({ id: trabajador.id });
        toast.error("Error al crear siniestro. Trabajador eliminado.");
      } catch (delErr) {
        toast.error("Error al crear siniestro y al eliminar trabajador.");
      }
    } else {
      toast.error("Ocurrió un error: " + err.message);
    }
  }
};

  if (artsLoading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-warning" role="status" />
      </div>
    );
  }
  if (artsError) {
    return (
      <div className="alert alert-danger mt-5">
        Error al cargar lista de ART: {artsError.message}
      </div>
    );
  }

  return (
    <main className="mt-5 p-5 col-lg-9 m-auto">
      <h2 className="my-3">Cargar nuevo Siniestro</h2>
      <form
        ref={formRef}
        className={`row g-3 needs-validation ${
          validated ? "was-validated" : ""
        }`}
        noValidate
        onSubmit={handleSubmit}
      >
        {/* DATOS SINIESTRO */}
        <div className="col-md-4">
          <label htmlFor="numStro" className="form-label dark-mode">
            Número de Stro.
          </label>
          <input
            type="number"
            className="form-control"
            id="numStro"
            value={formData.numStro}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d{0,9}$/.test(val)) {
                handleChange(e);
              }
            }}
            placeholder="Ej: 12345678"
            required
          />
          <div className="invalid-feedback">Ingrese número de siniestro.</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="fechaYHoraStro" className="form-label dark-mode">
            Fecha y hora de siniestro
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="fechaYHoraStro"
            max={new Date().toISOString().slice(0, 16)}
            value={formData.fechaYHoraStro}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">Seleccione fecha y hora.</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="artId" className="form-label dark-mode">
            Cliente (ART)
          </label>
          <select
            id="artId"
            className="form-select"
            value={formData.artId}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione</option>
            {arts.map((art) => (
              <option key={art.idART} value={art.idART}>
                {art.nombreART}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">Seleccione una ART.</div>
        </div>

        <hr className="mt-4" />
        <h4 className="text-warning">Datos del Trabajador</h4>

        {/* DATOS TRABAJADOR */}
        {[
          {
            id: "trabajador_dni",
            stateKey: "dni",
            label: "DNI",
            placeholder: "12345678",
            type: "number",
            required: true,
          },
          {
            id: "trabajador_nombre",
            stateKey: "nombre",
            label: "Nombre",
            placeholder: "Juan",
            type: "text",
            required: true,
          },
          {
            id: "trabajador_apellido",
            stateKey: "apellido",
            label: "Apellido",
            placeholder: "Pérez",
            type: "text",
            required: true,
          },
          {
            id: "trabajador_telefono",
            stateKey: "telefono",
            label: "Teléfono",
            placeholder: "01123456789",
            type: "tel",
            required: true,
          },
          {
            id: "trabajador_telefono2",
            stateKey: "telefono2",
            label: "Teléfono 2 (opcional)",
            placeholder: "01123456789",
            type: "tel",
            required: false,
          },
          {
            id: "trabajador_email",
            stateKey: "email",
            label: "Email",
            placeholder: "ejemplo@correo.com",
            type: "email",
            required: true,
          },
          {
            id: "trabajador_calle",
            stateKey: "calle",
            label: "Calle",
            placeholder: "Córdoba",
            type: "text",
            required: true,
          },
          {
            id: "trabajador_numero",
            stateKey: "numero",
            label: "Número",
            placeholder: "1234",
            type: "text",
            required: true,
          },
          {
            id: "trabajador_piso",
            stateKey: "piso",
            label: "Piso",
            placeholder: "1",
            type: "text",
            required: false, // Piso puede ser opcional
          },
          {
            id: "trabajador_depto",
            stateKey: "depto",
            label: "Departamento",
            placeholder: "A",
            type: "text",
            required: false, // Depto puede ser opcional
          },
          {
            id: "trabajador_cp",
            stateKey: "cp",
            label: "Código Postal",
            placeholder: "1234",
            type: "number",
            required: true,
          },
          {
            id: "trabajador_localidad",
            stateKey: "localidad",
            label: "Localidad",
            placeholder: "Avellaneda",
            type: "text",
            required: true,
          },
          {
            id: "trabajador_provincia",
            stateKey: "provincia",
            label: "Provincia",
            placeholder: "Buenos Aires",
            type: "text",
            required: true,
          },
        ].map(({ id, stateKey, label, placeholder, type, required }) => (
          <div className="col-md-3" key={id}>
            <label htmlFor={id} className="form-label dark-mode">
              {label}
            </label>
            <input
              type={type}
              className="form-control"
              id={id}
              placeholder={`Ej: ${placeholder}`}
              value={trabajadorData[stateKey] || ""}
              onChange={handleChange}
              required={required}
            />
            {required && (
              <div className="invalid-feedback">
                {`Ingrese ${label.toLowerCase()}.`}
              </div>
            )}
          </div>
        ))}

        {/* UBICACIÓN HECHO */}
        <hr className="mt-4" />
        <h4 className="text-warning">Ubicación del hecho</h4>

        <div className="col-md-3">
          <label htmlFor="lugar_direccion" className="form-label dark-mode">
            Dirección
          </label>
          <input
            type="text"
            className="form-control"
            id="lugar_direccion"
            placeholder="Ej: Córdoba 1000"
            value={formData.lugar_direccion}
            onChange={handleChange}
            maxLength={50}
            required
          />
          <div className="invalid-feedback">Ingrese dirección.</div>
        </div>
        <div className="col-md-3">
          <label htmlFor="lugar_entre_calles" className="form-label dark-mode">
            Entre Calles
          </label>
          <input
            type="text"
            className="form-control"
            id="lugar_entrecalles"
            placeholder="Ej: Córdoba y San Martín"
            value={formData.lugar_entrecalles}
            onChange={handleChange}
            maxLength={70}
            required
          />
          <div className="invalid-feedback">Ingrese entre calles.</div>
        </div>
        <div className="col-md-3">
          <label htmlFor="localidad" className="form-label dark-mode">
            Localidad
          </label>
          <input
            type="text"
            className="form-control"
            id="localidad"
            placeholder="Ej: Avellaneda"
            value={formData.localidad}
            onChange={handleChange}
            maxLength={30}
            required
          />
          <div className="invalid-feedback">Ingrese localidad.</div>
        </div>
        <div className="col-md-3">
          <label htmlFor="provincia" className="form-label dark-mode">
            Provincia
          </label>
          <select
            id="provincia"
            className="form-select"
            value={formData.provincia}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione</option>
            <option>Buenos Aires</option>
            <option>CABA</option>
            <option>Catamarca</option>
            <option>Chubut</option>
            <option>Santa Fe</option>
            <option>Córdoba</option>
            <option>Entre Ríos</option>
            <option>Mendoza</option>
            <option>San Juan</option>
            <option>San Luis</option>
            <option>La Rioja</option>
            <option>Salta</option>
            <option>Jujuy</option>
            <option>Corrientes</option>
            <option>Santiago del Estero</option>
            <option>Neuquén</option>
            <option>Río Negro</option>
            <option>Formosa</option>
            <option>Chaco</option>
            <option>Misiones</option>
            <option>La Pampa</option>
            <option>Santa Cruz</option>
            <option>Tucumán</option>
            <option>Tierra del Fuego</option>
          </select>
          <div className="invalid-feedback">Seleccione provincia.</div>
        </div>

        {/* DETALLES */}
        <hr className="mt-4" />
        <h4 className="text-warning">Detalles del accidente</h4>

        <div className="col-md-4">
          <label htmlFor="tipoSiniestro" className="form-label dark-mode">
            Tipo de siniestro
          </label>
          <select
            id="tipoStro"
            className="form-select"
            value={formData.tipoStro}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione</option>
            <option value="In Itínere">In Itínere</option>
            <option value="Laboral">Laboral</option>
          </select>
          <div className="invalid-feedback">Ingrese tipo de siniestro.</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="gravedad" className="form-label dark-mode">
            Gravedad
          </label>
          <select
            id="gravedad"
            className="form-select"
            value={formData.gravedad}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione</option>
            <option value="Leve">Leve</option>
            <option value="Moderado">Moderado</option>
            <option value="Grave">Grave</option>
            <option value="ROAM">ROAM</option>
            <option value="Mortal">Mortal</option>
          </select>
          <div className="invalid-feedback">Seleccione gravedad.</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="tipoInvestigacion" className="form-label dark-mode">
            Tipo de investigación
          </label>
          <select
            id="tipoInvestigacion"
            className="form-select"
            value={formData.tipoInvestigacion}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione</option>
            <option value="In Situ">In Situ</option>
            <option value="Mixta">Mixta</option>
            <option value="Virtual">Virtual</option>
          </select>
          <div className="invalid-feedback">
            Seleccione tipo de investigación.
          </div>
        </div>

        <div className="col-12">
          <label htmlFor="mechanicaHecho" className="form-label dark-mode">
            Mecánica del hecho
          </label>
          <textarea
            className="form-control"
            id="mechanicaHecho"
            rows="3"
            placeholder="Describa la mecánica..."
            value={formData.mechanicaHecho}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">
            Describa la mecánica del hecho.
          </div>
        </div>
        {/* DETALLES */}
        <hr className="mt-4" />
        <h4 className="text-warning">Otros datos</h4>

        <div className="col-md-4">
          <label
            htmlFor="nombrePrestadorMedico"
            className="form-label dark-mode"
          >
            Prestador Médico
          </label>
          <input
            type="text"
            className="form-control"
            id="nombrePrestadorMedico"
            placeholder="Ej: Galeno"
            value={formData.nombrePrestadorMedico}
            onChange={handleChange}
          />
          <div className="invalid-feedback">
            Ingrese nombre del prestador médico.
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="lesiones" className="form-label dark-mode">
            Lesiones
          </label>
          <input
            type="text"
            className="form-control"
            id="lesiones"
            placeholder="Ej: Fractura de brazo"
            value={formData.lesiones}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">Ingrese tipo de lesiones.</div>
        </div>
        <div className="col-md-4">
          <label
            htmlFor="patologiasInculpables"
            className="form-label dark-mode"
          >
            Patologías Inculpables
          </label>
          <input
            type="text"
            className="form-control"
            id="patologiasInculpables"
            placeholder="Ej: Hipertensión"
            value={formData.patologiasInculpables}
            onChange={handleChange}
          />
          <div className="invalid-feedback">
            Ingrese patologías inculpables.
          </div>
        </div>

        <div className="col-12">
          <label htmlFor="observaciones" className="form-label dark-mode">
            Observaciones
          </label>
          <textarea
            className="form-control"
            id="observaciones"
            rows="2"
            placeholder="observaciones..."
            value={formData.observaciones}
            onChange={handleChange}
          />
          <div className="invalid-feedback">Describa las observaciones.</div>
        </div>

        {/* BOTÓN */}
        <hr className="mt-4" />
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-warning float-end"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Cargar Siniestro"}
          </button>
        </div>
      </form>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme={theme === "dark" ? "dark" : "light"}
      />
    </main>
  );
};
