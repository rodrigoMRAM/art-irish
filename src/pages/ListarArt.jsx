import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useArts, useDeleteArt, useUpdateArt } from "../hooks/useGetArt"; // Ajustá path
import { ToastContainer, toast } from 'react-toastify';
import { useTheme } from "../utils/ThemeState";
export const ListarArt = () => {
  const { data: arts = [], isLoading, error } = useArts();
  
  const { theme } = useTheme();
  const deleteMutation = useDeleteArt();
  const updateMutation = useUpdateArt();

  const navigate = useNavigate();

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


  if (isLoading) return <p>Cargando arts...</p>;
  if (error) return <p>Error al cargar arts</p>;

  return (
    <main className="mt-5 px-5 overflow-y-auto">
        <div className="d-flex justify-content-between align-items-center pt-5">
        <h2>Lista de Clientes</h2>
        <button
          className="btn btn-warning mb-3"
          onClick={() => navigate("/cliente")}
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




      {/* Modal de Eliminación */}
      {showDeleteModal && selectedArt && (
        <div className="modal show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Confirmar Eliminación</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                />
              </div>
              <div className="modal-body">
                <p>
                  ¿Estás seguro que querés eliminar al art{" "}
                  {selectedArt.nombreART}?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleDelete}
                  disabled={deleteMutation.isLoading}
                >
                  {deleteMutation.isLoading ? "Eliminando..." : "Eliminar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edición */}
      {showEditModal && selectedArt && (
        <div className="modal show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Editar Art</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                />
              </div>
              <form onSubmit={handleEditSubmit}>
                <div className="modal-body">
                  {["nombreART", "nombreAnalista", "apellidoAnalista"].map(
                    (field) => (
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
                        <label htmlFor={field}>
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                      </div>
                    )
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowEditModal(false)}
                    type="button"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={updateMutation.isLoading}
                  >
                    {updateMutation.isLoading ? "Guardando..." : "Guardar cambios"}
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
