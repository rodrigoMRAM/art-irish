import React from 'react';
import useGetAuditores from '../hooks/useGetAuditores';

export const ListarAuditor = () => {
  const { data: auditores, isLoading, isError, error } = useGetAuditores();
    console.log(auditores)
  if (isLoading) return <p>Cargando auditores...</p>;
  if (isError) return <p className="text-danger">Error: {error.message}</p>;

  return (
    <main className="mt-5 px-5">
      <h2>Lista de Auditores</h2>
      <table className="table table-striped table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Nombre</th>
            <th>CP</th>
            <th>Domicilio</th>
            <th>Localidad</th>
          </tr>
        </thead>
        {/* <tbody>
          {auditores.map((auditor) => (
            <tr key={auditor.id}>
              <td>{auditor.id}</td>
              <td>{auditor.apellido}</td>
              <td>{auditor.dni}</td>
              <td>{auditor.nombre}</td>
              <td>{auditor.cp}</td>
              <td>{auditor.domicilio}</td>
              <td>{auditor.localidad}</td>
            </tr>
          ))}
        </tbody> */}
      </table>
    </main>
  );
};
