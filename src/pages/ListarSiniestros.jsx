import React, { useState } from "react";
import { useTheme } from "../utils/ThemeState";
import {
  useSiniestros,
  useDeleteSiniestro,
  useAssignAnalista,
} from "../hooks/useSiniestro";
import useListaUsuarios from "../hooks/useListaUsuarios";
import { useArts } from "../hooks/useGetArt";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import formatDate from "../utils/formatDate";
import { toast } from "react-toastify";

export const ListarSiniestros = () => {
  // -------------------------------
  // 1. Estados para filtros y búsqueda
  // -------------------------------
  const [inputNumStro, setInputNumStro] = useState("");
  const [numStroSearch, setNumStroSearch] = useState("");
  const [selectedArtId, setSelectedArtId] = useState("");
  const [selectedAnalistaId, setSelectedAnalistaId] = useState("");

  const token = useSelector((state) => state.user.jwt);

  // -------------------------------
  // 2. Cargar listas de ART y analistas
  // -------------------------------
  const {
    data: arts = [],
    isLoading: artsLoading,
    error: artsError,
  } = useArts();

  const {
    usuarios: analistas = [],
    isLoading: analistasLoading,
    error: analistasError,
  } = useListaUsuarios();

  // -------------------------------
  // 3. Hook para obtener siniestros:
  //    pasa numStroSearch, artId y analistaId
  // -------------------------------
  const {
    data: siniestros = [],
    isLoading: siniestrosLoading,
    error: siniestrosError,
  } = useSiniestros({
    numStro: numStroSearch,
    artId: selectedArtId,
    analistaId: selectedAnalistaId,
  });

  const deleteMutation = useDeleteSiniestro();
  const assignAnalista = useAssignAnalista();
  const { theme } = useTheme();
  const navigate = useNavigate();

  // -------------------------------
  // 4. Modal y handlers
  // -------------------------------
  const [showModal, setShowModal] = useState(false);
  const [selectedSiniestro, setSelectedSiniestro] = useState(null);

  const handleShowModal = (s) => {
    setSelectedSiniestro(s);
    setShowModal(true);
  };

  const handleDelete = (idStro) => {
    deleteMutation.mutate(
      { idStro },
      {
        onSuccess: () => {
          setShowModal(false);
          toast.success("Eliminado correctamente");
          // Si había búsqueda activa, refrescarla
          if (numStroSearch) {
            setNumStroSearch(numStroSearch);
          }
        },
        onError: () => {
          toast.error("Error al eliminar");
        },
      }
    );
  };

  const handleSelectAnalista = (idStro, value) => {
    assignAnalista.mutate({ idStro, analistaId: value || null });
  };

  const handleSummary = (siniestro) => {
    navigate("/resumen", { state: { formData: siniestro } });
  };

  const handleEdit = (siniestro) => {
    navigate("/siniestros/editar", { state: { formData: siniestro } });
  };

  // -------------------------------
  // 5. Ejecutar búsqueda por numStro al hacer clic
  // -------------------------------
  const handleSearchClick = () => {
    setNumStroSearch(inputNumStro);
  };

  // -------------------------------
  // 6. Feedback de carga / errores
  // -------------------------------
  if (artsLoading || analistasLoading || siniestrosLoading) {
    return <p>Cargando datos…</p>;
  }
  if (artsError) {
    return <p>Error al cargar lista de ART: {artsError.message}</p>;
  }
  if (analistasError) {
    return <p>Error al cargar lista de analistas: {analistasError.message}</p>;
  }
  if (siniestrosError) {
    return <p>Error al cargar siniestros: {siniestrosError.message}</p>;
  }

  // -------------------------------
  // 7. Renderizado de la vista
  // -------------------------------
  return (
    <main className="mt-5 px-5 overflow-y-auto">
      {/* Barra superior: input de búsqueda y botón “Nuevo” */}
      <div className="d-flex justify-content-between align-items-center pt-5 flex-wrap">
        <div className="input-group mb-3 w-50">
          <input
            type="number"
            className="form-control"
            placeholder="Ingresá el número de siniestro"
            value={inputNumStro}
            onChange={(e) => setInputNumStro(e.target.value)}
          />
          <button
            className="btn btn-outline-warning"
            type="button"
            onClick={handleSearchClick}
          >
            Buscar
          </button>
        </div>
        <button
          className="btn btn-warning mb-3"
          onClick={() => navigate("/siniestros")}
        >
          Nvo. Siniestro
        </button>
      </div>
      <br />

      {/* Tabla de siniestros */}
      <div className="table-responsive">
        <table className="table table-striped table-hover no-wrap">
          <thead
            className={`${theme === "dark" ? "table-dark" : "table-light"} no-wrap`}
          >
            <tr>
              <th>Número Stro.</th>
              <th>Fecha de Ingreso</th>
              <th>Fecha de Vto.</th>
              <th>
                <select
                  className="form-select form-select-sm"
                  style={{
                    border: "none",
                    fontWeight: "bold",
                    cursor: "pointer",
                    height: "26px",
                    width: "150px",
                  }}
                  value={selectedArtId}
                  onChange={(e) => {
                    setSelectedArtId(e.target.value);
                    setNumStroSearch(""); // cancelar búsqueda si cambio filtro
                  }}
                >
                  <option value="">Todas las ART</option>
                  {arts.map((art) => (
                    <option key={art.idART} value={art.idART}>
                      {art.nombreART}
                    </option>
                  ))}
                </select>
              </th>
              <th>Accidentado</th>
              <th>Tipo</th>
              <th>
                <select
                  className="form-select form-select-sm"
                  style={{
                    border: "none",
                    fontWeight: "bold",
                    cursor: "pointer",
                    height: "26px",
                    width: "150px",
                  }}
                  value={selectedAnalistaId}
                  onChange={(e) => {
                    setSelectedAnalistaId(e.target.value);
                    setNumStroSearch(""); // cancelar búsqueda si cambio filtro
                  }}
                >
                  <option value="">Todos los Analistas</option>
                  {analistas.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.nombre} {a.apellido}
                    </option>
                  ))}
                </select>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody className="no-wrap table-group-divider">
            {siniestros.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  Sin resultados.
                </td>
              </tr>
            ) : (
              siniestros.map((data) => (
                <tr key={data.idStro}>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSummary(data)}
                  >
                    <strong>{data.numStro}</strong>
                  </td>
                  <td className="fecha">{formatDate(data.fechaIngreso)}</td>
                  <td className="fecha">{formatDate(data.fecha_vencimiento)}</td>
                  <td>{data.art?.nombreART || "Sin datos"}</td>
                  <td>{data.trabajador?.apellido || "Sin datos"}</td>
                  <td>{data.tipoStro || "Sin datos"}</td>
                  <td>
                    <select
                      style={{ width: "140px" }}
                      className="form-select form-select-sm border border-warning"
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
                          <button
                            className="dropdown-item"
                            onClick={() => handleSummary(data)}
                          >
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmación */}
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
                />
              </div>
              <div className="modal-body">
                <p>
                  ¿Estás seguro de que deseas eliminar el siniestro{" "}
                  <strong>{selectedSiniestro.numStro}</strong>?
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
