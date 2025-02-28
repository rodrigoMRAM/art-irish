import React, { useState } from 'react'
import { useTheme } from '../utils/ThemeState';
import useSiniestros from '../hooks/useSiniestro';
import { useNavigate } from 'react-router-dom';


export const ListarSiniestros = () => {
    const { siniestros, loading, error, deleteSiniestro } = useSiniestros();
    const { theme } = useTheme();
    const [showModal, setShowModal] = useState(false);
    const [selectedSiniestro, setSelectedSiniestro] = useState(null);
    const navigate = useNavigate();
    const handleDelete = (id) => {
        console.log(id)
        deleteSiniestro(id);
        setShowModal(false);
    };

    const handleShowModal = (siniestro) => {
        setSelectedSiniestro(siniestro);
        setShowModal(true);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    const handleEdit = (siniestro) => {
        console.log(siniestro)
        navigate('/siniestros/editar', { state: { formData: siniestro } });
      };

    return (
        <main className="mt-5 px-5">
            <h2 className="pt-5">Lista de Siniestros</h2>
            <br/>
            
            <table className="table table-striped table-bordered table-hover no-wrap">
                <thead className={`${theme === 'dark' ? 'table-dark': 'table-light'} no-wrap`}>
                    <tr>
                        <th>Número Stro.</th>
                        <th>Fecha de Ingreso</th>
                        <th>Fecha de Vto.</th>
                        <th>Tipo de Stro.</th>
                        <th>Resultado</th>
                        <th>Fecha y Hora</th>
                        <th>Gravedad</th>
                        <th>Lesiones</th>
                        <th>Lugar del hecho</th>
                        <th>Entre Calles</th>
                        <th>Localidad</th>
                        <th>Provincia</th>
                        <th>Prestador Médico</th>
                        <th>Patologías Inculpables</th>
                        <th>Modificar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody className={`${theme === 'dark' ? 'table-dark': 'table-light'} no-wrap`}>
                    {siniestros.map((data, index) => (
                        <tr key={index}>
                            <td>{data.numStro}</td>
                            <td className="fecha">{formatDate(data.fechaIngreso)}</td>
                            <td className="fecha">{formatDate(data.fecha_vencimiento)}</td>
                            <td>{data.tipoStro}</td>
                            <td>{data.resultado}</td>
                            <td>{formatDate(data.fechaYHoraStro)}</td>
                            <td>{data.gravedad}</td>
                            <td>{data.lesiones}</td>
                            <td>{data.lugar_direccion}</td>
                            <td>{data.lugar_entrecalles}</td>
                            <td>{data.localidad}</td>
                            <td>{data.provincia}</td>
                            <td>{data.nombrePrestadorMedico}</td>
                            <td>{data.patologiasInculpables}</td>
                            <td><a className="btn btn-success btn-sm" onClick={() => handleEdit(data)}>Modificar</a></td>
                            <td><a className="btn btn-danger btn-sm" onClick={() => handleShowModal(data)}>Eliminar</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal de Bootstrap */}
            {selectedSiniestro && (
                <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-black">Confirmar Eliminación</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                            </div>
                            <div className="modal-body text-black">
                                <p>¿Estás seguro de que deseas eliminar el siniestro {selectedSiniestro.numStro}?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                                <button type="button" className="btn btn-danger" onClick={() => handleDelete(selectedSiniestro.idStro)}>Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
  )
}
