import React from 'react'
import { useLocation } from 'react-router-dom';

export const Resumen = () => {
   const location = useLocation();
  const { formData } = location.state || {}; 

  return (
    <div className="container mt-5">
        
        <div className="card p-4 mt-5 w-full">
  <div className="card-body">
    <div className='d-flex justify-content-between mb-3'>
    <div className='fs-2'>
          | Estudio
          <b>
            <span className="text-warning strong">Irish </span>
          </b>
          |
        </div>
    <h5 className="card-title">Resumen</h5>
    </div>
<div className='d-flex justify-content-between'>
    <p><strong className='text-warning'>Número de siniestro:</strong> {formData.idStro}</p>
    <div className='d-flex flex-column text-end'>

<p><strong className='text-warning'>Fecha:</strong> {formData.fechaYHoraStro}</p>
<p><strong className='text-warning'>Cliente:</strong> {formData.art}</p>
    </div>
</div>
<h2>Datos de trabajador</h2>
<hr className="shrink-0 bg-divider border-none w-full h-divider" role="separator"></hr>
<div className='d-flex justify-content-between flex-wrap'>
<div>

<p><strong className='text-warning'>DNI:</strong> [DNI]</p>
<p><strong className='text-warning'>Nombre y Apellido:</strong> [Nombre Apellido]</p>
<p><strong className='text-warning'>Teléfono 1:</strong> [Teléfono]</p>
<p><strong className='text-warning'>Teléfono 2:</strong> [Teléfono 2]</p>
</div>
<div>

<p><strong className='text-warning'>Email:</strong> [Email]</p>
<p><strong className='text-warning'>Calle:</strong> [Calle]</p>
<p><strong className='text-warning'>Número:</strong> [Número]</p>
<p><strong className='text-warning'>Piso:</strong> [Piso]</p>
</div>
<div>

<p><strong className='text-warning'>Departamento:</strong> [Depto]</p>
<p><strong className='text-warning'>Código Postal:</strong> [Código Postal]</p>
<p><strong className='text-warning'>Localidad:</strong> [Localidad]</p>
<p><strong className='text-warning'>Provincia:</strong> [Provincia]</p>
</div>
</div>
<h2 className='mt-4'>Lugar del hecho</h2>
<hr className="shrink-0 bg-divider border-none w-full h-divider" role="separator"></hr>
<div>

<p><strong className='text-warning'>Dirección:</strong> {formData.lugar_direccion}</p>
<p><strong className='text-warning'>Entre calles:</strong> {formData.lugar_entrecalles}</p>
<p><strong className='text-warning'>Localidad:</strong> {formData.localidad}</p>
<p><strong className='text-warning'>Provincia:</strong> {formData.provincia}</p>
<p><strong className='text-warning'>Mecánica del hecho:</strong> {formData.mechanicaHecho}</p>
</div>
<h2 className='mt-4'>Detalles</h2>
<hr className="shrink-0 bg-divider border-none w-full h-divider" role="separator"></hr>
<div className='d-flex flex-wrap'>
<div className='col-12 col-md-4'>

<p><strong className='text-warning'>Gravedad:</strong> {formData.gravedad}</p>
<p><strong className='text-warning'>Tipo de investigación:</strong> {formData.tipoInvestigacion}</p>
<p><strong className='text-warning'>Prestador médico:</strong> {formData.nombrePrestadorMedico}</p>
<p><strong className='text-warning'>Lesiones:</strong> {formData.lesiones}</p>
</div>
<div className='col-12 col-md-4'>

<p><strong className='text-warning'>Patologías inculpables:</strong> {formData.patologiasInculpables}</p>
<p><strong className='text-warning'>Tipo de siniestro:</strong> {formData.tipoStro}</p>
<p><strong className='text-warning'>Resultado:</strong> {formData.resultado}</p>
</div>
</div>
<h2 className='mt-4'>Observaciones</h2>
<hr className="shrink-0 bg-divider border-none w-full h-divider" role="separator"></hr>
<div className="card w-full" >
  <div className="card-body">
    {formData.observaciones}
  </div>
  </div>

  </div>
</div>
</div>
  )
}
