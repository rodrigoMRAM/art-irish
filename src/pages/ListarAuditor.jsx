import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAuditores,
  useDeleteAuditor,
  useUpdateAuditor,
} from "../hooks/useGetAuditores";
import { ToastContainer, toast } from 'react-toastify';
import { useTheme } from "../utils/ThemeState";
export const ListarAuditor = () => {
  const { data: auditores = [], isLoading, error } = useAuditores();
  const deleteAuditor = useDeleteAuditor();
  const updateAuditor = useUpdateAuditor();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAuditor, setSelectedAuditor] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    apellido: "",
    dni: "",
    nombre: "",
    cp: "",
    domicilio: "",
    localidad: "",
  });

  const handleShowDeleteModal = (auditor) => {
    setSelectedAuditor(auditor);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
  deleteAuditor.mutate(
    { id: selectedAuditor.id },
    {
      onSuccess: () => {
        setShowDeleteModal(false);
        toast.success('Eliminado correctamente');
      },
      onError: () => {
        toast.error('Error al eliminar');
      },
    }
  );
};


  const handleShowEditModal = (auditor) => {
    setSelectedAuditor(auditor);
    setFormData(auditor);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
  e.preventDefault();
  updateAuditor.mutate(
    { id: selectedAuditor.id, data: formData },
    {
      onSuccess: () => {
        setShowEditModal(false);
        toast.success('Actualizado correctamente');
      },
      onError: () => {
        toast.error('Error al actualizar');
      },
    }
  );
};

  if (isLoading) return <p>Cargando auditores...</p>;
  if (error) return <p>Error al cargar auditores</p>;

  return (
    <main className="mt-5 px-5">
      <div className="d-flex justify-content-between align-items-center pt-5">
        <h2>Lista de Auditores</h2>
        <button
          className="btn btn-warning mb-3"
          onClick={() => navigate("/auditor")}
        >
          Nuevo Auditor
        </button>
      </div>

      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Nombre</th>
            <th>CP</th>
            <th>Domicilio</th>
            <th>Localidad</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {auditores.map((auditor) => (
            <tr key={auditor.id}>
              <td>{auditor.apellido}</td>
              <td>{auditor.dni}</td>
              <td>{auditor.nombre}</td>
              <td>{auditor.cp}</td>
              <td>{auditor.domicilio}</td>
              <td>{auditor.localidad}</td>
              <td>
                <div className="dropdown">
                  <button
                    className="btn"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    &#x22EE;
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleShowEditModal(auditor)}
                      >
                        Editar
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={() => handleShowDeleteModal(auditor)}
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

      {/* Modal de Eliminación */}
      {showDeleteModal && selectedAuditor && (
        <div className="modal show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Confirmar Eliminación</h5>
                <button className="btn-close" onClick={() => setShowDeleteModal(false)} />
              </div>
              <div className="modal-body">
                <p>
                  ¿Estás seguro que querés eliminar al auditor {selectedAuditor.nombre} {selectedAuditor.apellido}?
                </p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                  Cancelar
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edición */}
      {showEditModal && selectedAuditor && (
        <div className="modal show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Editar Auditor</h5>
                <button className="btn-close" onClick={() => setShowEditModal(false)} />
              </div>
              <form onSubmit={handleEditSubmit}>
                <div className="modal-body">
                  {["dni", "nombre", "apellido", "cp", "domicilio", "localidad"].map((field) => (
                    <div className="form-floating mb-3" key={field}>
                      <input
                        type="text"
                        name={field}
                        value={formData[field]}
                        onChange={handleEditChange}
                        className="form-control"
                        id={field}
                        placeholder={field}
                        required
                      />
                      <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    </div>
                  ))}
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Guardar cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
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
