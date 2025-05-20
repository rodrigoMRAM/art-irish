import React, { useState } from "react";
import { useTheme } from "../utils/ThemeState";
import useSiniestros from "../hooks/useSiniestro";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "../assets/icons/delete.svg?react";

export const ListarSiniestros = () => {
  const { siniestros, loading, error, deleteSiniestro } = useSiniestros();
  const { theme } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [selectedSiniestro, setSelectedSiniestro] = useState(null);
  const navigate = useNavigate();
  const handleDelete = (id) => {
    deleteSiniestro(id);
    setShowModal(false);
  };

  const handleShowModal = (siniestro) => {
    setSelectedSiniestro(siniestro);
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const handleEdit = (siniestro) => {
    navigate("/siniestros/editar", { state: { formData: siniestro } });
  };

  return (
    <main className="mt-5 px-5">
      <div className="d-flex justify-content-between align-items-center pt-5">
        <h2 className="">Lista de Siniestros</h2>
        <button
          className="btn btn-warning mb-3"
          onClick={() => navigate("/siniestros")}
        >
          Nvo Siniestro
        </button>
      </div>
      <br />
      <div class="table-responsive">
        <table className="table table-striped table-hover no-wrap">
          <thead
            className={`${
              theme === "dark" ? "table-dark" : "table-light"
            } no-wrap`}
          >
            <tr>
              <th>Número Stro.</th>
              <th>Fecha de Ingreso</th>
              <th>Fecha de Vto.</th>
              <th>Tipo de Stro.</th>
              <th>Lugar del hecho</th>
              <th>Localidad</th>
              <th>Provincia</th>
              <th></th>
            </tr>
          </thead>
          <tbody className={`no-wrap table-group-divider`}>
            {siniestros.map((data, index) => (
              <tr key={index}>
                <td>{data.numStro}</td>
                <td className="fecha">{formatDate(data.fechaIngreso)}</td>
                <td className="fecha">{formatDate(data.fecha_vencimiento)}</td>
                <td>{data.tipoStro}</td>
                <td>{data.lugar_direccion}</td>
                <td>{data.localidad}</td>
                <td>{data.provincia}</td>

                <td>
                  <a
                    className="mx-2 btn btn-sm btn-outline-warning"
                    onClick={() => handleEdit(data)}
                  >
                    Editar
                  </a>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => handleShowModal(data)}
                  >
                    <DeleteIcon />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal de Bootstrap */}
      {selectedSiniestro && (
        <div
          className={`modal fade ${showModal ? "show" : ""}`}
          style={{ display: showModal ? "block" : "none" }}
          tabIndex="-1"
          role="dialog"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Eliminación</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  ¿Estás seguro de que deseas eliminar el siniestro{" "}
                  {selectedSiniestro.numStro}?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(selectedSiniestro.idStro)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
