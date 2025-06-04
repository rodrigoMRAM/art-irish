// ListarAuditor.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAuditores,
  useDeleteAuditor,
  useUpdateAuditor,
} from "../hooks/useGetAuditores";
import useCreateAuditor from "../hooks/useCreateAuditor";
import { ToastContainer, toast } from "react-toastify";
import { useTheme } from "../utils/ThemeState";
import { useQueryClient } from "@tanstack/react-query";


import { AuditorFormModal } from "../components/auditor/AuditorFormModal";
import { DeleteConfirmationModal } from "../components/auditor/DeleteConfirmationModal";

export const ListarAuditor = () => {
  const { data: auditores = [], isLoading, error } = useAuditores();
  const deleteAuditor = useDeleteAuditor();
  const updateAuditor = useUpdateAuditor();
  const { mutate: createAuditor, isPending: creating } = useCreateAuditor();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Estados para los modales
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAuditor, setSelectedAuditor] = useState(null);

  // ------------------ Delete ------------------
  const handleShowDeleteModal = (auditor) => {
    setSelectedAuditor(auditor);
    setShowDeleteModal(true);
  };
  const handleDeleteConfirm = () => {
    deleteAuditor.mutate(
      { id: selectedAuditor.id },
      {
        onSuccess: () => {
          setShowDeleteModal(false);
          toast.success("Eliminado correctamente");
          // Refrescar la lista
          queryClient.invalidateQueries(["auditores"]);
        },
        onError: () => {
          toast.error("Error al eliminar");
        },
      }
    );
  };

  // ------------------ Edit ------------------
  const handleShowEditModal = (auditor) => {
    setSelectedAuditor(auditor);
    setShowEditModal(true);
  };
  const handleEditSubmit = (formData) => {
    updateAuditor.mutate(
      { id: selectedAuditor.id, data: formData },
      {
        onSuccess: () => {
          setShowEditModal(false);
          toast.success("Actualizado correctamente");
          queryClient.invalidateQueries(["auditores"]);
        },
        onError: () => {
          toast.error("Error al actualizar");
        },
      }
    );
  };

  // ------------------ Create ------------------
  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };
  const handleCreateSubmit = (formData) => {
    createAuditor(formData, {
      onSuccess: () => {
        setShowCreateModal(false);
        toast.success("Auditor creado con éxito");
        queryClient.invalidateQueries(["auditores"]);
      },
      onError: (err) => {
        toast.error(`Error: ${err.message}`);
      },
    });
  };

  // ------------------ Loading / Error ------------------
  if (isLoading) return <p>Cargando auditores...</p>;
  if (error) return <p>Error al cargar auditores</p>;

  return (
    <main className="mt-5 px-5 overflow-y-auto">
      <div className="d-flex justify-content-between align-items-center pt-5">
        <h2>Lista de Auditores</h2>
        <button
          className="btn btn-warning mb-3"
          onClick={handleOpenCreateModal}
        >
          Nuevo Auditor
        </button>
      </div>

      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>DNI</th>
            <th>Nombre y Apellido</th>
            <th>CP</th>
            <th>Domicilio</th>
            <th>Localidad</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {auditores.map((auditor) => (
            <tr key={auditor.id}>
              <td>{auditor.dni}</td>
              <td>
                {auditor.nombre} {auditor.apellido}
              </td>
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
      <DeleteConfirmationModal
        show={showDeleteModal}
        entityName={
          selectedAuditor
            ? `${selectedAuditor.nombre} ${selectedAuditor.apellido}`
            : ""
        }
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        theme={theme}
      />

      {/* Modal de Edición */}
      <AuditorFormModal
        mode="edit"
        show={showEditModal}
        initialData={selectedAuditor}
        onCancel={() => setShowEditModal(false)}
        onSubmit={handleEditSubmit}
        isSubmitting={updateAuditor.isLoading}
        theme={theme}
      />

      {/* Modal de Creación */}
      <AuditorFormModal
        mode="create"
        show={showCreateModal}
        initialData={null}
        onCancel={() => setShowCreateModal(false)}
        onSubmit={handleCreateSubmit}
        isSubmitting={creating}
        theme={theme}
      />

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