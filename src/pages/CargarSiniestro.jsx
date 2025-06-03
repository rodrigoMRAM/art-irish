import React, { useState, useEffect } from "react";
import {
  useSiniestros,
  useCrearSiniestro,
  useDeleteSiniestro,
  useUpdateSiniestro,
  useAssignAnalista,
} from '../hooks/useSiniestro'; // ajusta el path según tu estructura
import { ToastContainer, toast } from 'react-toastify';
import { useTheme } from "../utils/ThemeState";

import { useArts, useDeleteArt, useUpdateArt } from "../hooks/useGetArt";
import { useCreateTrabajador } from "../hooks/useCreateTrabajador";

const initialFormData = {
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
  const { data: arts = [], isLoading, error : errorart } = useArts();
  const { mutateAsync: createTrabajador } = useCreateTrabajador();
  const { mutate, isLoading: loading , error, success} = useCrearSiniestro();
  

  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    numStro: "",
    fechaYHoraStro: "",
    tipoInvestigacion: "",
    lugar_direccion: "",
    lugar_entrecalles: "",
    localidad: "",
    provincia: "",
    mechanicaHecho: "",
    gravedad: "",
    nombrePrestadorMedico: "",
    lesiones: "",
    patologiasInculpables: "",
    tipoStro: "",
    resultado: "",
    tieneRecupero: true,
    observaciones: "",
    artId: null,
    trabajadorId: "",
  });
  const [formDataTrabajador, setFormDataTrabajador] = useState(initialFormData);
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
    setFormDataTrabajador({
      ...formDataTrabajador,
      [id]: type === "checkbox" ? checked : value,
    });
  };

// console.log(formData)
const handleSubmit = (e) => {
  e.preventDefault();

  createTrabajador(formDataTrabajador, {
    onSuccess: (trabajadorCreado) => {
      const idTrabajador = trabajadorCreado.id;

      const payload = {
        formData: {
          ...formData,
          trabajadorId:  idTrabajador, // Asignar el ID del trabajador creado,
        }
      };

      mutate(payload, {
        onSuccess: () => {
          toast.success('Siniestro creado correctamente');
          setFormData({
            numStro: "",
            fechaYHoraStro: "",
            tipoInvestigacion: "",
            lugar_direccion: "",
            lugar_entrecalles: "",
            localidad: "",
            provincia: "",
            mechanicaHecho: "",
            gravedad: "",
            nombrePrestadorMedico: "",
            lesiones: "",
            patologiasInculpables: "",
            tipoStro: "",
            resultado: "",
            tieneRecupero: true,
            observaciones: "",
            artId: null,
            trabajadorId: "",
            aseguradoId: "",  
          });
          setFormDataTrabajador(initialFormData);
        },
        onError: () => {
          toast.error('Error al crear el siniestro');
        }
      });
    },
    onError: () => {
      toast.error('Error al crear el trabajador');
    }
  });
};



  return (
    <main className="mt-5 p-5 col-lg-9 m-auto">
      <div>
        
        <h2 className="my-3">Cargar nuevo Siniestro</h2>

        <p className="mb-0 text-danger"></p>
        <form className="row g-3" onSubmit={handleSubmit}>
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
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="fechaYHoraStro" className="form-label dark-mode">
              Fecha y hora de siniestro
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
  <label htmlFor="tipoInvestigacion" className="form-label dark-mode">
    Cliente
  </label>
  <select
    id="artId"
    className="form-select"
    value={formData.artId}
    onChange={handleChange}
    name="artId"
  >
    <option value="">Seleccione</option>

    {arts.map((art) => (
      <option key={art.idART} value={art.idART}>
        {art.nombreART}
      </option>
    ))}
  </select> 



</div>
   {/* ESPACION */}
 <hr />
          <h4 className="my-3 text-warning ">Datos del trabajador</h4>
          <div className="col-md-3">
  <label htmlFor="dni" className="form-label dark-mode">DNI</label>
  <input
    type="number"
    className="form-control"
    id="dni"
    value={formDataTrabajador.dni}
    onChange={handleChange}
    placeholder="Ej: 33874652"
    required
  />
</div>
<div className="col-md-3">
  <label htmlFor="nombre" className="form-label dark-mode">Nombre</label>
  <input
    type="text"
    className="form-control"
    id="nombre"
    value={formDataTrabajador.nombre}
    onChange={handleChange}
    placeholder="Ej: Matias"
    required
  />
</div>
<div className="col-md-3">
  <label htmlFor="apellido" className="form-label dark-mode">Apellido</label>
  <input
    type="text"
    className="form-control"
    id="apellido"
    value={formDataTrabajador.apellido}
    onChange={handleChange}
    placeholder="Ej: Martinez"
    required
  />
</div>
<div className="col-md-3">
  <label htmlFor="telefono" className="form-label dark-mode">Teléfono</label>
  <input
    type="tel"
    className="form-control"
    id="telefono"
    value={formDataTrabajador.telefono}
    onChange={handleChange}
    placeholder="Ej: 11567812123"
  />
</div>
<div className="col-md-3">
  <label htmlFor="telefono2" className="form-label dark-mode">Teléfono 2 (opcional)</label>
  <input
    type="tel"
    className="form-control"
    id="telefono2"
    value={formDataTrabajador.telefono2}
    onChange={handleChange}
    placeholder="Ej: 1167894222"
  />
</div>
<div className="col-md-4">
  <label htmlFor="email" className="form-label dark-mode">Email</label>
  <input
    type="email"
    className="form-control"
    id="email"
    value={formDataTrabajador.email}
    onChange={handleChange}
    placeholder="Ej: matias@email.com"
  />
</div>
<div className="col-md-4">
  <label htmlFor="calle" className="form-label dark-mode">Calle</label>
  <input
    type="text"
    className="form-control"
    id="calle"
    value={formDataTrabajador.calle}
    onChange={handleChange}
    placeholder="Ej: Av. Republica"
  />
</div>
{/* <div className="col-md-4">
  <label htmlFor="calle" className="form-label dark-mode">Entre calles</label>
  <input
    type="text"
    className="form-control"
    id="calle"
    value={formDataTrabajador.calle}
    onChange={handleChange}
    placeholder="Ej: Av. Republica"
  />
</div> */}
<div className="col-md-2">
  <label htmlFor="numero" className="form-label dark-mode">Número</label>
  <input
    type="number"
    className="form-control"
    id="numero"
    value={formDataTrabajador.numero}
    onChange={handleChange}
    placeholder="Ej: 989"
  />
</div>
<div className="col-md-2">
  <label htmlFor="piso" className="form-label dark-mode">Piso</label>
  <input
    type="text"
    className="form-control"
    id="piso"
    value={formDataTrabajador.piso}
    onChange={handleChange}
    placeholder="Ej: 4"
  />
</div>
<div className="col-md-2">
  <label htmlFor="depto" className="form-label dark-mode">Depto</label>
  <input
    type="text"
    className="form-control"
    id="depto"
    value={formDataTrabajador.depto}
    onChange={handleChange}
    placeholder="Ej: C"
  />
</div>
<div className="col-md-2">
  <label htmlFor="cp" className="form-label dark-mode">Código Postal</label>
  <input
    type="number"
    className="form-control"
    id="cp"
    value={formDataTrabajador.cp}
    onChange={handleChange}
    placeholder="Ej: 8000"
  />
</div>
<div className="col-md-3">
  <label htmlFor="localidad" className="form-label dark-mode">Localidad</label>
  <input
    type="text"
    className="form-control"
    id="localidad"
    value={formDataTrabajador.localidad}
    onChange={handleChange}
    placeholder="Ej: Bahía Blanca"
  />
</div>
<div className="col-md-3">
  <label htmlFor="provincia" className="form-label dark-mode">Provincia</label>
  <input
    type="text"
    className="form-control"
    id="provincia1"
    value={formDataTrabajador.provincia}
    onChange={handleChange}
    placeholder="Ej: Buenos Aires"
  />
</div>




          {/* ESPACION */}

          <hr />
          <h4 className="my-3 text-warning ">Lugar y descripción del hecho</h4>
          <div className="col-md-4">
            <label htmlFor="lugar_direccion" className="form-label dark-mode">
              Lugar del hecho (Direccion)
            </label>
            <input
              type="text"
              className="form-control"
              id="lugar_direccion"
              value={formData.lugar_direccion}
              onChange={handleChange}
              placeholder="Ej: Cordoba 1000"
              required
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
              required
            />
          </div>
          <div className="col-md-2">
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
              <option value="Buenos Aires">Buenos Aires</option>
              <option value="Neuquén">Neuquén</option>
              <option value="Santa Fe">Santa Fe</option>
              <option value="La Pampa">La Pampa</option>
              <option value="Tucuman">Tucumán</option>
              <option value="Corrientes">Corrientes</option>
              <option value="Mendoza">Mendoza</option>
              <option value="La Rioja">La Rioja</option>
              <option value="Chaco">Chaco</option>
              <option value="Cordoba">Córdoba</option>
              <option value="Salta">Salta</option>
              <option value="Jujuy">Jujuy</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="mechanicaHecho" className="form-label dark-mode">
              Mecánica del Hecho
            </label>
            <textarea
              className="form-control"
              id="mechanicaHecho"
              rows="3"
              value={formData.mechanicaHecho}
              onChange={handleChange}
              placeholder="Describa la mecánica de los hechos..."
              required
            ></textarea>
          </div>
          <hr />
          <h4 className="my-3 text-warning">Otros detalles</h4>
          <div className="col-md-2">
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
              <option value="0">Seleccione</option>
              <option value="Leve">Leve</option>
              <option value="Moderado">Moderado</option>
              <option value="Grave">Grave</option>
              <option value="ROAM">ROAM</option>
              <option value="Mortal">Mortal</option>
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="tipoInvestigacion" className="form-label dark-mode">
              Tipo de Investigación
            </label>
            <select
              id="tipoInvestigacion"
              className="form-select"
              value={formData.tipoInvestigacion}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione</option>
              <option value="Tipo 1">In Situ</option>
              <option value="Tipo 2">Mixta</option>
              <option value="Tipo 2">Virtual</option>
            </select>
          </div>
          <div className="col-md-3">
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
              required
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
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="patologiasInculpables"
              className="form-label dark-mode"
            >
              Patologías Inculpables
            </label>
            <textarea
              className="form-control"
              id="patologiasInculpables"
              rows="3"
              value={formData.patologiasInculpables}
              onChange={handleChange}
              placeholder="Ingrese patologías Inculpables..."
            ></textarea>
          </div>
          <div className="col-md-5">
            <label htmlFor="tipoStro" className="form-label dark-mode">
              Tipo de Siniestro
            </label>
            <input
              type="text"
              className="form-control"
              id="tipoStro"
              value={formData.tipoStro}
              onChange={handleChange}
              placeholder="Ingrese el tipo de Siniestro"
              required
            />
          </div>
          {/* <div className="col-md-7">
            <label htmlFor="resultado" className="form-label dark-mode">
              Resultado
            </label>
            <input
              type="text"
              className="form-control"
              id="resultado"
              value={formData.resultado}
              onChange={handleChange}
              placeholder="Ingrese el resultado"
            />
          </div> */}
          {/* <div className="form-check form-switch col-md-4 mx-2">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="tieneRecupero"
              checked={formData.tieneRecupero}
              onChange={handleChange}
            />
            <label
              className="form-check-label  dark-mode"
              htmlFor="tieneRecupero"
            >
              Tiene Recupero
            </label>
          </div> */}
          <hr />
          <h4 className="text-warning">Observaciones</h4>
          <div className="mb-3">
            <label
              htmlFor="observaciones"
              className="form-label dark-mode"
            ></label>
            <textarea
              className="form-control"
              id="observaciones"
              rows="1"
              value={formData.observaciones}
              onChange={handleChange}
              placeholder="Ingrese observaciones... (opcional)"
            ></textarea>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-warning px-3 float-end">
              {loading ? "Cargando..." : "Cargar Siniestro"}
            </button>
          </div>
          
          {success ? (
            <p className="text-success">Siniestro creado con exito</p>
          ) : (
            ""
          )}
        </form>
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
    </main>
  );
};
