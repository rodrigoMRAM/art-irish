// DeleteConfirmationModal.jsx
import React from "react";
import PropTypes from "prop-types";

export const DeleteConfirmationModal = ({
  show,
  entityName,
  onCancel,
  onConfirm,
  theme,
}) => {
  if (!show) return null;

  return (
    <div className="modal show d-block">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Confirmar Eliminación</h5>
            <button className="btn-close" onClick={onCancel} />
          </div>
          <div className="modal-body">
            <p>
              ¿Estás seguro que querés eliminar a {entityName}?
            </p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
            <button className="btn btn-danger" onClick={onConfirm}>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

DeleteConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  entityName: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  theme: PropTypes.oneOf(["light", "dark"]).isRequired,
};
