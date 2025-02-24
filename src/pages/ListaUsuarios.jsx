import React from 'react'
import { useTheme } from '../utils/ThemeState';

export const ListaUsuarios = () => {
    const { theme } = useTheme();
  return (
    <main class="mt-5 px-5">
             {/* <div th:if="${param.exito}" class="text-center">
               <p class="alert alert-info">Usuario Registrado Exitosamente!!</p>
           </div> */}
            <h2 class="pt-5">Lista de Usuarios</h2>
            <br/>
            <table class="table table-striped table-bordered ">
                <thead class={`${theme === 'dark' ? 'table-dark': 'table-light'} no-wrap`}>
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
                 <tbody class={`${theme === 'dark' ? 'table-dark': 'table-light'} no-wrap`}>
                    <tr>
                        <td></td>
                         <td></td>
                         <td></td>
                        <td></td>
                           <td></td>
                            <td><a class="btn btn-success btn-sm">Modificar</a></td>
                             <td><a class="btn btn-danger btn-sm">Eliminar</a></td>
                    </tr>
                </tbody>
            </table>

        </main>
  )
}
