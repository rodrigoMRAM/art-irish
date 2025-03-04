import React, { useState, useEffect, use } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSiniestros from '../hooks/useSiniestro';

export const EditarSiniestro = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(location.state?.formData || {});
  const { siniestros, loading, error, updateSiniestros } = useSiniestros();
  useEffect(() => {
    if (location.state?.formData) {
      setFormData(location.state.formData);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSiniestros(formData.idStro, formData);  // Esperamos a que termine la actualización
      navigate('/siniestros/listar'); // Navegamos solo cuando la actualización se haya completado correctamente
    } catch (error) {
      console.error("Error al actualizar el siniestro:", error);
    }
  };

  return (
    <main className="mt-5 p-5 col-lg-9 m-auto">
      <div>
        <h2 className="my-3">Editar Siniestro {formData.numStro}</h2>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-4">
            <label htmlFor="numStro" className="form-label dark-mode">Número de Stro.</label>
            <input type="number" className="form-control" id="numStro" value={formData.numStro} onChange={handleChange} placeholder="Ej: 12345678" />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="fechaYHoraStro" className="form-label dark-mode">Fecha y Hora</label>
            <input type="datetime-local" className="form-control" id="fechaYHoraStro" value={formData.fechaYHoraStro} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label htmlFor="accidentado" className="form-label dark-mode">Accidentado</label>
            <select id="tipoInvestigacion" className="form-select" value={formData.tipoInvestigacion} onChange={handleChange}>
              <option value="">Seleccione</option>
              <option value="Tipo 1">...</option>
              <option value="Tipo 2">...</option>
            </select>
          </div>
          <hr />
          <h4 className="my-3 text-warning">Lugar y descripción del hecho</h4>
          <div className="col-md-4">
            <label htmlFor="lugar_direccion" className="form-label dark-mode">Lugar del hecho (Dirección)</label>
            <input type="text" className="form-control" id="lugar_direccion" value={formData.lugar_direccion} onChange={handleChange} placeholder="Ej: Cordoba 1000" />
          </div>
          <div className="col-md-3">
            <label htmlFor="lugar_entrecalles" className="form-label dark-mode">Entre calles</label>
            <input type="text" className="form-control" id="lugar_entrecalles" value={formData.lugar_entrecalles} onChange={handleChange} placeholder="Entre Calles" />
          </div>
          <div className="col-md-3">
            <label htmlFor="localidad" className="form-label dark-mode">Localidad</label>
            <input type="text" className="form-control" id="localidad" value={formData.localidad} onChange={handleChange} placeholder="Ej: Avellaneda" />
          </div>
          <div className="col-md-2">
            <label htmlFor="provincia" className="form-label dark-mode">Provincia</label>
            <select id="provincia" className="form-select" value={formData.provincia} onChange={handleChange}>
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
            <label htmlFor="mechanicaHecho" className="form-label dark-mode">Mecánica del Hecho</label>
            <textarea className="form-control" id="mechanicaHecho" rows="3" value={formData.mechanicaHecho} onChange={handleChange} placeholder="Describa la mecánica de los hechos..."></textarea>
          </div>
          <hr />
          <h4 className="my-3 text-warning">Otros detalles</h4>
          <div className="col-md-2">
            <label htmlFor="gravedad" className="form-label dark-mode">Gravedad</label>
            <select id="gravedad" className="form-select" value={formData.gravedad} onChange={handleChange}>
              <option value="0">Seleccione</option>
              <option value="Leve">Leve</option>
              <option value="Moderado">Moderado</option>
              <option value="Grave">Grave</option>
              <option value="ROAM">ROAM</option>
              <option value="Mortal">Mortal</option>
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="tipoInvestigacion" className="form-label dark-mode">Tipo de Investigación</label>
            <select id="tipoInvestigacion" className="form-select" value={formData.tipoInvestigacion} onChange={handleChange}>
              <option value="">Seleccione</option>
              <option value="Tipo 1">In Situ</option>
              <option value="Tipo 2">Mixta</option>
              <option value="Tipo 3">Virtual</option>
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="nombrePrestadorMedico" className="form-label dark-mode">Prestador Médico</label>
            <input type="text" className="form-control" id="nombrePrestadorMedico" value={formData.nombrePrestadorMedico} onChange={handleChange} placeholder="Ej: Galeno" />
          </div>
          <div className="col-md-4">
            <label htmlFor="lesiones" className="form-label dark-mode">Lesiones</label>
            <input type="text" className="form-control" id="lesiones" value={formData.lesiones} onChange={handleChange} placeholder="Ingrese Lesiones" />
          </div>
          <div className="mb-3">
            <label htmlFor="patologiasInculpables" className="form-label dark-mode">Patologías Inculpables</label>
            <textarea className="form-control" id="patologiasInculpables" rows="3" value={formData.patologiasInculpables} onChange={handleChange} placeholder="Ingrese patologías Inculpables..."></textarea>
          </div>
          <div className="col-md-5">
            <label htmlFor="tipoStro" className="form-label dark-mode">Tipo de Siniestro</label>
            <input type="text" className="form-control" id="tipoStro" value={formData.tipoStro} onChange={handleChange} placeholder="Ingrese el tipo de Siniestro" />
          </div>
          <div className="col-md-7">
            <label htmlFor="resultado" className="form-label dark-mode">Resultado</label>
            <input type="text" className="form-control" id="resultado" value={formData.resultado} onChange={handleChange} placeholder="Ingrese el resultado" />
          </div>
          <div className="form-check form-switch col-md-4 mx-2">
            <input className="form-check-input" type="checkbox" role="switch" id="tieneRecupero" checked={formData.tieneRecupero} onChange={handleChange} />
            <label className="form-check-label dark-mode" htmlFor="tieneRecupero">Tiene Recupero</label>
          </div>
          <hr />
          <h4 className="text-warning">Observaciones</h4>
          <div className="mb-3">
            <label htmlFor="observaciones" className="form-label dark-mode"></label>
            <textarea className="form-control" id="observaciones" rows="1" value={formData.observaciones} onChange={handleChange} placeholder="Ingrese observaciones... (opcional)"></textarea>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-warning px-3 float-end">Guardar Cambios</button>
            <button type="submit" className="btn btn-danger px-3 float-end mx-3" onClick={()=>navigate('/siniestros/listar')}>Cancelar</button>
          </div>
        </form>
      </div>
    </main>
  );
};