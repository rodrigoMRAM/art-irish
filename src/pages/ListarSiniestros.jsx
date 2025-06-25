import React, { useState } from "react";
import { VscArrowSmallDown, VscArrowSmallUp  } from "react-icons/vsc";

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
import Search from "../assets/icons/search.svg";
import Close from "../assets/icons/close.svg";

export const ListarSiniestros = () => {
  // -------------------------------
  // 1. Estados para filtros, búsqueda y paginado
  // -------------------------------
  const [inputNumStro, setInputNumStro] = useState("");
  const [numStroSearch, setNumStroSearch] = useState("");
  const [selectedArtId, setSelectedArtId] = useState("");
  const [selectedAnalistaId, setSelectedAnalistaId] = useState("");
  const [page, setPage] = useState(0);
  const size = 5; // Cantidad de siniestros por página
  // Ordenamiento por fecha de ingreso (descendente)
  const [sortDir, setSortDir] = useState("desc");

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

  const manejarKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  // -------------------------------
  // 3. Hook para obtener siniestros:
  //    pasa numStroSearch, artId y analistaId
  // -------------------------------
  const {
    data,
    isLoading: siniestrosLoading,
    error: siniestrosError,
  } = useSiniestros({
    numStro: numStroSearch,
    artId: selectedArtId,
    analistaId: selectedAnalistaId,
    sortDir,
    size,
    page,
  });

  // Normaliza la variable siniestros para que siempre sea un array
  const siniestros = Array.isArray(data?.content)
    ? data.content
    : Array.isArray(data)
    ? data
    : [];

  const totalPages = data?.totalPages ?? 0;

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
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Cargando datos...</span>
        </div>
      </div>
    );
  }
  if (artsError) {
    return (
      <div className="alert alert-danger m-5">
        Error cargando ART: {artsError.message}
      </div>
    );
  }
  if (analistasError) {
    return (
      <div className="alert alert-danger m-5">
        Error cargando analistas: {analistasError.message}
      </div>
    );
  }
  if (siniestrosError) {
    return (
      <div className="alert alert-danger m-5">
        Error cargando siniestros: {siniestrosError.message}
      </div>
    );
  }

  const handleOrderByDate = () => {
    setSortDir((prev) => (prev === "desc" ? "asc" : "desc"));
    // Resetear paginado al cambiar orden
    setPage(0);
  };
  const handleLimpiarFiltros = () => {
    setNumStroSearch("");
    setInputNumStro("");
    setSelectedArtId("");
    setSelectedAnalistaId("");
    setPage(0);
  };
  // -------------------------------
  // 7. Renderizado de la vista
  // -------------------------------
  return (
    <main className="mt-5 px-5 overflow-y-auto">
      {/* Barra superior: input de búsqueda y botón “Nuevo” */}
      <div className="d-flex justify-content-between align-items-center pt-5 flex-wrap">
        <div className="d-flex w-50 align-items-center gap-2">
          <div className="mb-3 w-50" style={{ position: "relative" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresá el número de siniestro"
              value={inputNumStro}
              onKeyDown={manejarKeyDown}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  // solo permite números
                  setInputNumStro(value);
                }
              }}
              pla
              style={{ paddingRight: "2.5rem" }}
            />
            <img
              src={Search}
              onClick={handleSearchClick}
              style={{
                position: "absolute",
                top: "50%",
                right: "0.75rem",
                cursor: "pointer",
                transform: "translateY(-50%)",
                color: "#6c757d",
              }}
            />
          </div>

          {(numStroSearch || selectedArtId || selectedAnalistaId) && (
            <div className="mb-3">
              {" "}
              <button
                className="text-warning bg-transparent border-0 p-0 m-0 shadow-none"
                text-decoration-none
                onClick={handleLimpiarFiltros}
              >
                Quitar filtros
                <img src={Close} alt="" srcset="" />
              </button>
            </div>
          )}
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
            className={`${
              theme === "dark" ? "table-dark" : "table-light"
            } no-wrap`}
          >
            <tr>
              <th>Número Stro.</th>
              <th onClick={handleOrderByDate} style={{ cursor: "pointer" }}>
                Fecha de Ingreso{" "}
                {sortDir === "asc" ? (
                  <VscArrowSmallUp size="1.8em" />
                ) : (
                  <VscArrowSmallDown size="1.8em" />
                )}
              </th>
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
                  <td className="fecha">
                    {formatDate(data.fecha_vencimiento)}
                  </td>
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

        <nav aria-label="Paginación">
          <ul className="pagination pagination-sm justify-content-end">
            {/* Anterior */}
            <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
              <button
                className={`page-link ${
                  page !== 0 ? "border-warning text-warning" : ""
                }`}
                onClick={() => setPage(page - 1)}
                disabled={page === 0}
              >
                Anterior
              </button>
            </li>

            {/* Números de página */}
            {[...Array(totalPages)].map((_, idx) => (
              <li
                key={idx}
                className={`page-item ${page === idx ? "active" : ""}`}
              >
                <button
                  className={`page-link ${
                    page === idx
                      ? "bg-warning border-warning text-dark"
                      : "text-warning border-warning bg-transparent"
                  }`}
                  onClick={() => setPage(idx)}
                >
                  {idx + 1}
                </button>
              </li>
            ))}

            {/* Siguiente */}
            <li
              className={`page-item ${
                page === totalPages - 1 ? "disabled" : ""
              }`}
            >
              <button
                className={`page-link ${
                  page !== totalPages - 1
                    ? "border-warning text-warning"
                    : ""
                }`}
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages - 1}
              >
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
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
