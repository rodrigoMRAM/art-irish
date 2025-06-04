import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useArts, useDeleteArt, useUpdateArt } from "../hooks/useGetArt"; 
import { ToastContainer, toast } from 'react-toastify';
import { useTheme } from "../utils/ThemeState";
import { ClienteFormModal } from "../components/clientes/ClienteFormModal";
import { DeleteConfirmationModal } from "../components/clientes/DeleteConfirmationModal";
import  useCrearArt  from "../hooks/useCreateArt";

export const ListarArt = () => {
  const { data: arts = [], isLoading, error } = useArts();
  
  const { theme } = useTheme();
  const deleteMutation = useDeleteArt();
  const updateMutation = useUpdateArt();
  const createMutation = useCrearArt();
  const navigate = useNavigate();
    const [showCreateModal, setShowCreateModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedArt, setSelectedArt] = useState(null);
  const [formData, setFormData] = useState({
    nombreART: "",
    nombreAnalista: "",
    apellidoAnalista: "",
  });

  const handleShowDeleteModal = (art) => {
    setSelectedArt(art);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
  deleteMutation.mutate(
    { idART: selectedArt.idART },
    {
      onSuccess: () => {
        setShowDeleteModal(false);
        toast.success('¡Eliminado correctamente!');
      },
      onError: () => {
        toast.error('Error al eliminar.');
      },
    }
  );
};


  const handleShowEditModal = (art) => {
    setSelectedArt(art);
    setFormData({
      nombreART: art.nombreART,
      nombreAnalista: art.nombreAnalista,
      apellidoAnalista: art.apellidoAnalista,
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleEditSubmit = (e) => {
  e.preventDefault();
  updateMutation.mutate(
    { idART: selectedArt.idART, data: formData },
    {
      onSuccess: () => {
        setShowEditModal(false);
        toast.success('¡Actualización exitosa!');
      },
      onError: () => {
        toast.error('Hubo un error al actualizar');
      },
    }
  );
};

 const handleCreateSubmit = (formData) => {
  createMutation.crearArt(
    formData,
    {
      onSuccess: () => {
        setShowCreateModal(false);
        toast.success('¡ART creado correctamente!');
      },
      onError: () => {
        toast.error('Error al crear ART.');
      },
    }
  );
};


  if (isLoading) return <p>Cargando arts...</p>;
  if (error) return <p>Error al cargar arts</p>;

  return (
    <main className="mt-5 px-5 overflow-y-auto">
        <div className="d-flex justify-content-between align-items-center pt-5">
        <h2>Lista de Clientes</h2>
        <button
          className="btn btn-warning mb-3"
                    onClick={() => setShowCreateModal(true)}

        >
          Nuevo Cliente
        </button>
      </div>
     <div className="row">
  {arts.map((art) => (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={art.idART}>
      <div className="card h-100 border-1 shadow">
        <div
          className="d-flex flex-column h-100"
          
        >
          <div className="p-3">
            <h5 className="card-title">{art.nombreART}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              {art.nombreAnalista + ' ' + art.apellidoAnalista}
            </h6>
          </div>
          <hr className="shrink-0 bg-divider border-none w-full h-divider" role="separator"></hr>
          <div className="p-3 mt-auto">
            <button
              type="button"
              className="btn btn-warning me-2 "
              onClick={() => handleShowEditModal(art)}
              disabled={updateMutation.isLoading}
            >
              Editar
            </button>
            <button
              type="button"
              className="btn btn-danger "
              onClick={() => handleShowDeleteModal(art)}
              disabled={deleteMutation.isLoading}
            >
              Eliminar
              
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

       <DeleteConfirmationModal
              show={showDeleteModal}
              entityName={
                selectedArt
                  ? `${selectedArt.nombreART}`
                  : ""
              }
              onCancel={() => setShowDeleteModal(false)}
              onConfirm={handleDelete}
              theme={theme}
            />
      
            {/* Modal de crear */}
        <ClienteFormModal
  mode="create"
  show={showCreateModal}
  initialData={null}
  onCancel={() => setShowCreateModal(false)}
  onSubmit={handleCreateSubmit}
  isSubmitting={createMutation.loading}
  theme={theme}
/>

      {/* Modal de Edición */}
      <ClienteFormModal
        mode="edit"
        show={showEditModal}
        initialData={selectedArt}
        onCancel={() => setShowEditModal(false)}
        onSubmit={(formData) => {
          updateMutation.mutate(
            { idART: selectedArt.idART, data: formData },
            {
              onSuccess: () => {
                setShowEditModal(false);
                toast.success('¡Actualización exitosa!');
              },
              onError: () => {
                toast.error('Hubo un error al actualizar');
              },
            }
          );
        }}
        isSubmitting={updateMutation.isLoading}
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
