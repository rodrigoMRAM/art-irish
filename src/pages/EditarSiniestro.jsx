import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useSiniestros,
  useCrearSiniestro,
  useDeleteSiniestro,
  useUpdateSiniestro,
  useAssignAnalista,
} from '../hooks/useSiniestro';
import { useArts } from "../hooks/useGetArt";
import { useUpdateTrabajador } from "../hooks/useUpdateTrabajador";
import { ToastContainer, toast } from "react-toastify";
import { useTheme } from "../utils/ThemeState";

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

export const EditarSiniestro = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);
  const { theme } = useTheme();
  const updateTrabajador = useUpdateTrabajador();
  const updateMutation = useUpdateSiniestro();
  const deleteMutation = useDeleteSiniestro();
  const [trabajadorData, setTrabajadorData] = useState(initialTrabajador);
  const {data: arts = [],isLoading: artsLoading,error: artsError,} = useArts();

  const [formData, setFormData] = useState(() => {
    const stateData = location.state?.formData || {};
    return {
      ...stateData,
      analistaId: stateData.analista?.id ?? "",
    };
  });

  

  useEffect(() => {
    if (location.state?.formData) {
      setFormData(location.state.formData);
    }
  }, [location.state]);

  useEffect(() => {
  setValidated(false);
  formRef.current?.classList.remove("was-validated");
}, []);


  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    // Si es un campo de trabajador (id empieza con "trabajador_")
    if (id.startsWith("trabajador_")) {
      const key = id.replace("trabajador_", "");
      setFormData((prev) => ({
        ...prev,
        trabajador: {
          ...prev.trabajador,
          [key]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: type === "checkbox" ? checked : value,
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
    try {
      // Actualizar trabajador
      if (formData.trabajador?.id) {
        await updateTrabajador.mutateAsync({
          id: formData.trabajador.id,
          data: {
            ...formData.trabajador,
          },
        });
      }
      // Actualizar siniestro, enviando todos los datos tal como están (incluido analista)
      await updateMutation.mutateAsync({
        idStro: formData.idStro,
        updatedData: {
          ...formData,
          analistaId: formData.analistaId,
        },
      });

      navigate("/siniestros/listar", { state: { toast: "Siniestro editado correctamente" } });
    } catch (error) {
      console.error("Error al actualizar el siniestro o trabajador:", error);
    }
  };

  useEffect(() => {
    if (
      formData.art &&
      formData.art.idART &&
      (!formData.artId || formData.artId === "")
    ) {
      setFormData((prev) => ({
        ...prev,
        artId: formData.art.idART,
      }));
    }
  }, [formData.art]);

  return (
    <main className="mt-5 p-5 col-lg-9 m-auto">
      <div>
        <h2 className="my-3">Editar Siniestro {formData.numStro}</h2>
        <form ref={formRef} className={`row g-3 needs-validation ${validated ? "was-validated" : ""}`} noValidate onSubmit={handleSubmit}>
          <div className="col-md-4">
            <label htmlFor="numStro" className="form-label dark-mode">
              Número de Stro.
            </label>
            <input
              type="number"
              className="form-control"
              id="numStro"
              value={formData.numStro}
              onChange={handleChange}
              placeholder="Ej: 12345678"
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="fechaYHoraStro" className="form-label dark-mode">
              Fecha y Hora
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="fechaYHoraStro"
              value={formData.fechaYHoraStro}
              onChange={handleChange}
            />
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
              value: formData.trabajador?.dni,
              label: "DNI",
              placeholder: "12345678",
              type: "number",
              required: true,
            },
            {
              id: "trabajador_nombre",
              stateKey: "nombre",
              value: formData.trabajador?.nombre || "",
              label: "Nombre",
              placeholder: "Juan",
              type: "text",
              required: true,
            },
            {
              id: "trabajador_apellido",
              stateKey: "apellido",
              value: formData.trabajador?.apellido || "",
              label: "Apellido",
              placeholder: "Pérez",
              type: "text",
              required: true,
            },
            {
              id: "trabajador_telefono",
              stateKey: "telefono",
              value: formData.trabajador?.telefono || "",
              label: "Teléfono",
              placeholder: "01123456789",
              type: "tel",
              required: true,
            },
            {
              id: "trabajador_telefono2",
              stateKey: "telefono2",
              value: formData.trabajador?.telefono2 || "",
              label: "Teléfono 2 (opcional)",
              placeholder: "01123456789",
              type: "tel",
              required: false,
            },
            {
              id: "trabajador_email",
              stateKey: "email",
              value: formData.trabajador?.email || "",
              label: "Email",
              placeholder: "ejemplo@correo.com",
              type: "email",
              required: true,
            },
            {
              id: "trabajador_calle",
              stateKey: "calle",
              value: formData.trabajador?.calle || "",
              label: "Calle",
              placeholder: "Córdoba",
              type: "text",
              required: true,
            },
            {
              id: "trabajador_numero",
              stateKey: "numero",
              value: formData.trabajador?.numero || "",
              label: "Número",
              placeholder: "1234",
              type: "text",
              required: true,
            },
            {
              id: "trabajador_piso",
              stateKey: "piso",
              value: formData.trabajador?.piso || "",
              label: "Piso",
              placeholder: "1",
              type: "text",
              required: true,
            },
            {
              id: "trabajador_depto",
              stateKey: "depto",
              value: formData.trabajador?.depto || "",
              label: "Departamento",
              placeholder: "A",
              type: "text",
              required: true,
            },
            {
              id: "trabajador_cp",
              stateKey: "cp",
              value: formData.trabajador?.cp || "",
              label: "Código Postal",
              placeholder: "1234",
              type: "number",
              required: true,
            },
            {
              id: "trabajador_localidad",
              stateKey: "localidad",
              value: formData.trabajador?.localidad || "",
              label: "Localidad",
              placeholder: "Avellaneda",
              type: "text",
              required: true,
            },
            {
              id: "trabajador_provincia",
              stateKey: "provincia",
              value: formData.trabajador?.provincia || "",
              label: "Provincia",
              placeholder: "Buenos Aires",
              type: "text",
              required: true,
            },
          ].map(({ id, stateKey, value, label, placeholder, type, required }) => (
            <div className="col-md-3" key={id}>
              <label htmlFor={id} className="form-label dark-mode">
                {label}
              </label>
              <input
                type={type}
                className="form-control"
                id={id}
                placeholder={`Ej: ${placeholder}`}
                value={formData.trabajador?.[stateKey] || ""}
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
          <hr />
          <h4 className="my-3 text-warning">Ubicación del hecho</h4>
          <div className="col-md-3">
            <label htmlFor="lugar_direccion" className="form-label dark-mode">
              Dirección
            </label>
            <input
              type="text"
              className="form-control"
              id="lugar_direccion"
              value={formData.lugar_direccion}
              onChange={handleChange}
              placeholder="Ej: Cordoba 1000"
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="lugar_entrecalles" className="form-label dark-mode">
              Entre calles
            </label>
            <input
              type="text"
              className="form-control"
              id="lugar_entrecalles"
              value={formData.lugar_entrecalles}
              onChange={handleChange}
              placeholder="Entre Calles"
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="localidad" className="form-label dark-mode">
              Localidad
            </label>
            <input
              type="text"
              className="form-control"
              id="localidad"
              value={formData.localidad}
              onChange={handleChange}
              placeholder="Ej: Avellaneda"
            />
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
            >
              <option value="">Seleccione</option>
              <option value="Buenos Aires">Buenos Aires</option>
              <option value="Ciudad Autónoma de Buenos Aires">
                Ciudad Autónoma de Buenos Aires
              </option>
              <option value="Córdoba">Córdoba</option>
              <option value="Santa Fe">Santa Fe</option>
              <option value="Entre Ríos">Entre Ríos</option>
              <option value="La Pampa">La Pampa</option>
              <option value="Tucumán">Tucumán</option>
              <option value="Salta">Salta</option>
              <option value="Jujuy">Jujuy</option>
              <option value="Santiago del Estero">Santiago del Estero</option>
              <option value="Catamarca">Catamarca</option>
              <option value="La Rioja">La Rioja</option>
              <option value="Chaco">Chaco</option>
              <option value="Corrientes">Corrientes</option>
              <option value="Formosa">Formosa</option>
              <option value="Misiones">Misiones</option>
              <option value="Mendoza">Mendoza</option>
              <option value="San Juan">San Juan</option>
              <option value="San Luis">San Luis</option>
              <option value="Neuquén">Neuquén</option>
              <option value="Río Negro">Río Negro</option>
              <option value="Chubut">Chubut</option>
              <option value="Santa Cruz">Santa Cruz</option>
              <option value="Tierra del Fuego">Tierra del Fuego</option>
            </select>
          </div>
          <hr />
          <h4 className="my-3 text-warning">Detalles del accidente</h4>
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
            >
              <option value="0">Seleccione</option>
              <option value="Leve">Leve</option>
              <option value="Moderado">Moderado</option>
              <option value="Grave">Grave</option>
              <option value="ROAM">ROAM</option>
              <option value="Mortal">Mortal</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="tipoInvestigacion" className="form-label dark-mode">
              Tipo de Investigación
            </label>
            <select
              id="tipoInvestigacion"
              className="form-select"
              value={formData.tipoInvestigacion}
              onChange={handleChange}
            >
              <option value="">Seleccione</option>
              <option value="Tipo 1">In Situ</option>
              <option value="Tipo 2">Mixta</option>
              <option value="Tipo 3">Virtual</option>
            </select>
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


          <hr />
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
              value={formData.nombrePrestadorMedico}
              onChange={handleChange}
              placeholder="Ej: Galeno"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="lesiones" className="form-label dark-mode">
              Lesiones
            </label>
            <input
              type="text"
              className="form-control"
              id="lesiones"
              value={formData.lesiones}
              onChange={handleChange}
              placeholder="Ingrese Lesiones"
            />
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
              required
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
          <div className="col-12">
            <button type="submit" className="btn btn-warning px-3 float-end">
              Guardar Cambios
            </button>
            <button
              type="button"
              className="btn btn-danger px-3 float-end mx-3"
              onClick={() => navigate("/siniestros/listar")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme={theme === "dark" ? "dark" : "light"}
      />
    </main>
  );
};
