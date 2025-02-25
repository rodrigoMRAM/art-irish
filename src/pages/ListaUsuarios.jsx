import React from 'react'
import { useTheme } from '../utils/ThemeState';

export const ListaUsuarios = () => {
    const { theme } = useTheme();
  return (
    <main className="mt-5 px-5">
             {/* <div th:if="${param.exito}" className="text-center">
               <p className="alert alert-info">Usuario Registrado Exitosamente!!</p>
           </div> */}
            <h2 className="pt-5">Lista de Usuarios</h2>
            <br/>
            <table className="table table-striped table-bordered ">
                <thead className={`${theme === 'dark' ? 'table-dark': 'table-light'} no-wrap`}>
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
                 <tbody className={`${theme === 'dark' ? 'table-dark': 'table-light'} no-wrap`}>
                    <tr>
                        <td></td>
                         <td></td>
                         <td></td>
                        <td></td>
                           <td></td>
                            <td><a className="btn btn-success btn-sm">Modificar</a></td>
                             <td><a className="btn btn-danger btn-sm">Eliminar</a></td>
                    </tr>
                </tbody>
            </table>

        </main>
  )
}
