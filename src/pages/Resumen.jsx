import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import formatDate from "../utils/formatDate";
import { Button, Card } from "react-bootstrap";

export const Resumen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData } = location.state || {};

  console.log("formData", formData);

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
          <Button
            variant="warning"
            onClick={() => navigate(-1)}
            className="mt-3"
          >
            Volver
          </Button>
        </Card>
      </div>
    );
  }

  const trabajador = formData.trabajador || {};
  const asegurado = formData.asegurado || {};
  const contactos = formData.asegurado.contactosAsegurado || [];
  const art = formData.art || {};

  return (
    <div className="container mt-5">
      <Card className="col-10 p-4 mx-auto mt-5 shadow">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="fs-2">
            | Estudio <strong className="text-warning">Irish</strong> |
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
              {mostrar(art.nombreART)}
            </p>
            <p>
              <strong className="text-warning">Analista Externo:</strong>{" "}
              {mostrar(art.nombreAnalista + " " + art.apellidoAnalista)}
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
            <p>
              <strong className="text-warning">Estado:</strong>{" "}
              <span className="text-success">{mostrar(formData.estado)}</span>
            </p>
          </div>
        </div>

        {/* Sección: Datos del Asegurado */}
        <h2 className="mt-4">Datos del Asegurado</h2>
        <hr />
        <div className="justify-content-between d-flex flex-wrap">
          <div className="col-md-4 mb-3 ">
            <p>
              <strong className="text-warning">Nombre:</strong>{" "}
              {mostrar(asegurado.empresa)}
            </p>
            <p>
              <strong className="text-warning">CUIT:</strong>{" "}
              {mostrar(asegurado.cuit)}
            </p>
            <p>
              <strong className="text-warning">Teléfono 1:</strong>{" "}
              {mostrar(asegurado.telefono)}
            </p>
            <p>
              <strong className="text-warning">Teléfono 2:</strong>{" "}
              {mostrar(asegurado.telefono2)}
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <p>
              <strong className="text-warning">Email:</strong>{" "}
              {mostrar(asegurado.email)}
            </p>
            <p>
              <strong className="text-warning">Dirección:</strong>{" "}
              {mostrar(asegurado.domicilio)}
            </p>
            <p>
              <strong className="text-warning">Localidad:</strong>{" "}
              {mostrar(asegurado.localidad)}
            </p>
            <p>
              <strong className="text-warning">Nombre de Fantasía:</strong>{" "}
              {mostrar(asegurado.nombreFantasia)}
            </p>
          </div>

          <ul className="list-group w-100">
            <h5>Contactos:</h5>
            {contactos.length === 0 ? (
              <li className="list-group-item text-muted">
                No hay contactos asignados a este asegurado.
              </li>
            ) : (
              contactos.map((c, idx) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={idx}
                >
                  <div>
                <b>{c.nombre} {c.apellido}</b> – DNI: {c.dni} – Tel: {c.telefono} –{" "}
                    {c.sector}
                  </div>
                </li>
              ))
            )}
          </ul>
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
        <div className="d-flex justify-content-between mb-3 flex-wrap">
          <div className="col-md-4 mb-3">
            <h4 className="mt-4">Fecha y hora del hecho:</h4> <br />
            <p>
              <strong className="text-warning">Fecha del Hecho:</strong>{" "}
              {mostrarFecha(
                formData.fechaYHoraStro
                  ? formData.fechaYHoraStro.split("T")[0]
                  : ""
              )}
            </p>
            <p>
              <strong className="text-warning">Hora del Hecho:</strong>{" "}
              {formData.fechaYHoraStro
                ? formData.fechaYHoraStro.split("T")[1]?.slice(0, 5)
                : mostrar(formData.horaYHoraStro)}
            </p>
          </div>

          <div className="mb-3">
            <h4 className="mt-4">Lugar del hecho:</h4> <br />
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
        </div>
        <h2 className="mt-4">Mecánica del Hecho:</h2>
        <hr />
        <Card className="mb-4">
          <Card.Body>
            {formData.mechanicaHecho ? formData.mechanicaHecho : "Sin datos"}
          </Card.Body>
        </Card>
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
            {formData.observaciones ? formData.observaciones : "Sin datos"}
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
