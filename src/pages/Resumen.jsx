import React from 'react'

export const Resumen = () => {
  return (
    <div className="container mt-5">
        
        <div className="card p-4 mt-5" style={{width: '100%'}}>
  <div className="card-body">
    <div className='d-flex justify-content-between mb-3'>
    <div className={`navbar-brand`}>
          | Estudio
          <b>
            <span className="text-warning strong">Irish </span>
          </b>
          |
        </div>
    <h5 className="card-title">Resumen</h5>
    </div>
    {/* <h6 className="card-subtitle mb-2 text-muted">Subtítulo</h6> */}
<div className='d-flex justify-content-between'>
    <p><strong className='text-warning'>Número de siniestro:</strong> [Número de siniestro]</p>
    <div>

<p><strong className='text-warning'>Fecha:</strong> [Fecha]</p>
<p><strong className='text-warning'>Cliente:</strong> [Cliente]</p>
    </div>
</div>
<h2>Datos de trabajador</h2>
<div className='d-flex justify-content-between'>
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
<h2>Lugar del hecho</h2>
<div>

<p><strong className='text-warning'>Dirección:</strong> [Lugar del hecho]</p>
<p><strong className='text-warning'>Entre calles:</strong> [Entre calles]</p>
<p><strong className='text-warning'>Localidad:</strong> [Localidad del hecho]</p>
<p><strong className='text-warning'>Provincia:</strong> [Provincia del hecho]</p>
<p><strong className='text-warning'>Mecánica del hecho:</strong> [Mecánica del hecho]</p>
</div>
<h2>Otros detalles</h2>
<div>

<p><strong className='text-warning'>Gravedad:</strong> [Gravedad]</p>
<p><strong className='text-warning'>Tipo de investigación:</strong> [Tipo de investigación]</p>
<p><strong className='text-warning'>Prestador médico:</strong> [Prestador médico]</p>
<p><strong className='text-warning'>Lesiones:</strong> [Lesiones]</p>
<p><strong className='text-warning'>Patologías inculpables:</strong> [Patologías inculpables]</p>
<p><strong className='text-warning'>Tipo de siniestro:</strong> [Tipo de siniestro]</p>
<p><strong className='text-warning'>Resultado:</strong> [Resultado]</p>
</div>
<p><strong className='text-warning'>Observaciones:</strong> </p>
<div className="card" style={{width: '100%'}}>
  <div className="card-body">
    [Observaciones]
  </div>
  </div>

  </div>
</div>
</div>
  )
}
