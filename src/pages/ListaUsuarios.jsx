import React, { useState } from "react";
import { useTheme } from "../utils/ThemeState";
import useListaUsuarios from "../hooks/useListaUsuarios";

export const ListaUsuarios = () => {
  const { theme } = useTheme();
  const { usuarios, loading, error, success, deleteUsuario, editUsuario } =
    useListaUsuarios();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    dni: "",
    nombre: "",
    apellido: "",
    email: "",
    contra: "",
    rol: "",
  });

  const handleDelete = (id) => {
    deleteUsuario(id);
    setShowDeleteModal(false);
  };

  const handleShowDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleShowEditModal = (user) => {
    setSelectedUser(user);
    setFormData(user);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await editUsuario(selectedUser.id, formData);
    setShowEditModal(false);
  };

  return (
    <main className="mt-5 px-5">
      {success ? (
        <div className="text-center">
          <p className="alert alert-info">Usuario actualizado con éxito.</p>
        </div>
      ) : (
        ""
      )}
      <h2 className="pt-5">Lista de Usuarios</h2>
      <br />
      <table className="table table-striped">
        <thead
          className={`${
            theme === "dark" ? "table-dark" : "table-light"
          } no-wrap`}
        >
          <tr>
            <th>DNI</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Modificar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody
          className={`${
            theme === "dark" ? "table-dark" : "table-light"
          } no-wrap`}
        >
          {usuarios.map((usuario, index) => (
            <tr key={index}>
              <td>{usuario.dni}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.email}</td>
              <td>{usuario.rol}</td>
              <td>
                <a
                  className="btn btn-success btn-sm"
                  onClick={() => handleShowEditModal(usuario)}
                >
                  Modificar
                </a>
              </td>
              <td>
                <a
                  className="btn btn-danger btn-sm"
                  onClick={() => handleShowDeleteModal(usuario)}
                >
                  Eliminar
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Confirmación de Eliminación */}
      {selectedUser && (
        <div
          className={`modal fade ${showDeleteModal ? "show" : ""}`}
          style={{ display: showDeleteModal ? "block" : "none" }}
          tabIndex="-1"
          role="dialog"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Confirmar Eliminación
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  ¿Estás seguro de que deseas eliminar el usuario{" "}
                  {selectedUser.nombre + " " + selectedUser.apellido}?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(selectedUser.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edición de Usuario */}
      {selectedUser && (
        <div
          className={`modal fade ${showEditModal ? "show" : ""}`}
          style={{ display: showEditModal ? "block" : "none" }}
          tabIndex="-1"
          role="dialog"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modificar Usuario</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleEditSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      name="dni"
                      value={formData.dni}
                      onChange={handleEditChange}
                      className="form-control"
                      id="dni"
                      placeholder="DNI"
                      required
                    />
                    <label htmlFor="dni">DNI</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleEditChange}
                      className="form-control"
                      id="nombre"
                      placeholder="Nombre"
                      required
                    />
                    <label htmlFor="nombre">Nombre</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleEditChange}
                      className="form-control"
                      id="apellido"
                      placeholder="Apellido"
                      required
                    />
                    <label htmlFor="apellido">Apellido</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleEditChange}
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      required
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      name="contra"
                      value={formData.contra}
                      onChange={handleEditChange}
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      required
                    />
                    <label htmlFor="email">Contraseña</label>
                  </div>
                  <div className="form-floating mb-3">
                    <select
                      name="rol"
                      value={formData.rol}
                      onChange={handleEditChange}
                      className="form-select"
                      id="rol"
                      required
                    >
                      <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                      <option value="ANALISTA">ANALISTA</option>
                    </select>
                    <label htmlFor="rol">Rol</label>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Guardar Cambios
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
