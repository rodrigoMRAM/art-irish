import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import formatDate from "../utils/formatDate";
import { Button, Card } from "react-bootstrap";

export const Resumen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData } = location.state || {};

  const mostrar = (valor) => {
    if (valor === null || valor === undefined || valor === "") {
      return "Sin datos";
    }
    return valor;
  };

  const mostrarFecha = (fecha) => {
    try {
      return fecha ? formatDate(fecha) : "Sin datos";
    } catch {
      return "Sin datos";
    }
  };

  if (!formData) {
    return (
      <div className="container mt-5 text-center">
        <Card className="p-4">
          <h4>No se encontraron datos del siniestro.</h4>
          <Button variant="warning" onClick={() => navigate(-1)} className="mt-3">
            Volver
          </Button>
        </Card>
      </div>
    );
  }

  const trabajador = formData.trabajador || {};
  const art = formData.art || {};

  return (
    <div className="container mt-5">
      <Card className="col-10 p-4 mx-auto mt-5 shadow">
        
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="fs-2">
            | Estudio{" "}
            <strong className="text-warning">Irish</strong> |
          </div>
          <h5>RESUMEN</h5>
        </div>

        <div className="d-flex justify-content-between mb-3 flex-wrap">
          <div>
            <p>
              <strong className="text-warning">SINIESTRO:</strong>{" "}
              {mostrar(formData.numStro)}
            </p>
             <p>
              <strong className="text-warning">Cliente (ART):</strong>{" "}
              {`${mostrar(art.nombreART)}${art.nombreAnalista ? ` (${mostrar(art.nombreAnalista)} ${mostrar(art.apellidoAnalista)})` : ''}`}
            </p>
          </div>
          <div className="text-end">
            <p>
              <strong className="text-warning">Fecha de Ingreso:</strong>{" "}
              {mostrarFecha(formData.fechaIngreso)}
            </p>
            <p>
              <strong className="text-warning">Fecha de Vto:</strong>{" "}
              {mostrarFecha(formData.fecha_vencimiento)}
            </p>
           
          </div>
        </div>

        {/* Sección: Datos del Trabajador */}
        <h2 className="mt-4">Datos del Trabajador</h2>
        <hr />
        <div className="justify-content-between d-flex flex-wrap">
          <div className="col-md-4 mb-3 ">
            <p>
              <strong className="text-warning">DNI:</strong>{" "}
              {mostrar(trabajador.dni)}
            </p>
            <p>
              <strong className="text-warning">Nombre y Apellido:</strong>{" "}
              {`${mostrar(trabajador.nombre)} ${mostrar(trabajador.apellido)}`}
            </p>
            <p>
              <strong className="text-warning">Teléfono 1:</strong>{" "}
              {mostrar(trabajador.telefono)}
            </p>
            <p>
              <strong className="text-warning">Teléfono 2:</strong>{" "}
              {mostrar(trabajador.telefono2)}
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <p>
              <strong className="text-warning">Email:</strong>{" "}
              {mostrar(trabajador.email)}
            </p>
            <p>
              <strong className="text-warning">Calle:</strong>{" "}
              {mostrar(trabajador.calle)}
            </p>
            <p>
              <strong className="text-warning">Número:</strong>{" "}
              {mostrar(trabajador.numero)}
            </p>
            <p>
              <strong className="text-warning">Piso:</strong>{" "}
              {mostrar(trabajador.piso)}
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <p>
              <strong className="text-warning">Departamento:</strong>{" "}
              {mostrar(trabajador.depto)}
            </p>
            <p>
              <strong className="text-warning">Código Postal:</strong>{" "}
              {mostrar(trabajador.cp)}
            </p>
            <p>
              <strong className="text-warning">Localidad:</strong>{" "}
              {mostrar(trabajador.localidad)}
            </p>
            <p>
              <strong className="text-warning">Provincia:</strong>{" "}
              {mostrar(trabajador.provincia)}
            </p>
          </div>
        </div>

        {/* Sección: Lugar del Hecho */}
        <h2 className="mt-4">Datos del siniestro</h2>
        <hr />
        <div className="mb-3">
          <p>
            <strong className="text-warning">Dirección:</strong>{" "}
            {mostrar(formData.lugar_direccion)}
          </p>
          <p>
            <strong className="text-warning">Entre Calles:</strong>{" "}
            {mostrar(formData.lugar_entrecalles)}
          </p>
          <p>
            <strong className="text-warning">Localidad:</strong>{" "}
            {mostrar(formData.localidad)}
          </p>
          <p>
            <strong className="text-warning">Provincia:</strong>{" "}
            {mostrar(formData.provincia)}
          </p>
        </div>
        <h2 className="mt-4">Mecánica del Hecho:</h2>
        <hr />
        <Card className="mb-4">
          <Card.Body>
            {formData.mechanicaHecho
              ? formData.mechanicaHecho
              : "Sin datos"}
          </Card.Body>
        </Card>

        {/* Sección: Detalles */}
        <h2 className="mt-4">Otros detalles</h2>
        <hr />
        <div className="row">
          <div className="col-md-4 mb-3">
            <p>
              <strong className="text-warning">Gravedad:</strong>{" "}
              {mostrar(formData.gravedad)}
            </p>
            <p>
              <strong className="text-warning">Tipo de Investigación:</strong>{" "}
              {mostrar(formData.tipoInvestigacion)}
            </p>
            <p>
              <strong className="text-warning">Prestador Médico:</strong>{" "}
              {mostrar(formData.nombrePrestadorMedico)}
            </p>
            <p>
              <strong className="text-warning">Lesiones:</strong>{" "}
              {mostrar(formData.lesiones)}
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <p>
              <strong className="text-warning">Patologías Inculpables:</strong>{" "}
              {mostrar(formData.patologiasInculpables)}
            </p>
            <p>
              <strong className="text-warning">Tipo de Siniestro:</strong>{" "}
              {mostrar(formData.tipoStro)}
            </p>
            <p>
              <strong className="text-warning">Resultado:</strong>{" "}
              {mostrar(formData.resultado)}
            </p>
          </div>
        </div>

        {/* Sección: Observaciones */}
        <h2 className="mt-4">Observaciones</h2>
        <hr />
        <Card className="mb-4">
          <Card.Body>
            {formData.observaciones
              ? formData.observaciones
              : "Sin datos"}
          </Card.Body>
        </Card>

        <div className="text-end">
          <Button variant="outline-warning" onClick={() => navigate(-1)}>
            Volver
          </Button>
        </div>
      </Card>
    </div>
  );
};
