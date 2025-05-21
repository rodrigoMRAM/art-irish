import React, { useState } from "react";
import { useTheme } from "../utils/ThemeState";
import useSiniestros from "../hooks/useSiniestro";
import useListaUsuarios from "../hooks/useListaUsuarios";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "../assets/icons/delete.svg?react";

export const ListarSiniestros = () => {
  const { siniestros, deleteSiniestro, assignAnalista } = useSiniestros();
  const { usuarios: analistas } = useListaUsuarios();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);
  const [selectedSiniestro, setSelectedSiniestro] = React.useState(null);

  const handleShowModal = (s) => {
    setSelectedSiniestro(s);
    setShowModal(true);
  };
  const handleDelete = (id) => {
    deleteSiniestro(id);
    setShowModal(false);
  };

  const handleSelectAnalista = (idStro, value) => {
    // value = "" o UUID string
    assignAnalista(idStro, value || null);
  };

  const formatDate = (d) =>
    new Date(d).toLocaleString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

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
          Nvo. Siniestro
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
              <th>Nombre ART</th>
              <th>Lugar del hecho</th>
              <th>Localidad</th>
              <th>Analista</th>
              <th></th>
            </tr>
          </thead>
          <tbody className={`no-wrap table-group-divider`}>
            {siniestros.map((data) => (
              <tr key={data.idStro}>
                <td>{data.numStro}</td>
                <td className="fecha">{formatDate(data.fechaIngreso)}</td>
                <td className="fecha">{formatDate(data.fecha_vencimiento)}</td>
                <td>ART ?</td>
                <td>{data.lugar_direccion}</td>
                <td>{data.localidad}</td>
                <td>
                  <select
                    style={{ width: "140px" }}
                    className="form-select form-select-sm"
                    value={data.analista?.id ?? ""}
                    onChange={(e) =>
                      handleSelectAnalista(data.idStro, e.target.value)
                    }
                  >
                    <option value="">Sin asignar</option>
                    {analistas.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.nombre} {a.apellido}
                      </option>
                    ))}
                  </select>
                </td>

                <td>
                  <div className="dropdown">
                    <button
                      className="btn"
                      type="button"
                      id={`dropdownMenuButton-${data.idStro}`}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      &#x22EE;
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby={`dropdownMenuButton-${data.idStro}`}
                    >
                      <li>
                        <button className="dropdown-item">
                          <b>Ver Siniestro</b>
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleEdit(data)}
                        >
                          Editar
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => handleShowModal(data)}
                        >
                          Eliminar
                        </button>
                      </li>
                    </ul>
                  </div>
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
