import React from 'react'
import { useTheme } from '../../utils/ThemeState';
export const Home = () => {
    const { theme } = useTheme();


  return (
    <main class="mt-5 px-5">
            {/* <div th:if="${param.exito}" class="text-center">
                <p class="alert alert-info">Siniestro cargado Exitosamente!!</p>
            </div> */}
            <h2 class="pt-5">Bienvenido a Estudio Irish</h2>
            <br/>
             <h4 class="text-danger">Siniestros vencidos:</h4>
             <h5>No tienes siniestros vencidos!</h5>
               <h4 class="text-success mt-5">Siniestros en gestión:</h4>
            <table class="table table-striped table-bordered table-hover no-wrap">
                <thead class={`${theme === 'dark' ? 'table-dark': 'table-light'} no-wrap`}>
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
                      
                    </tr>
                </thead>
                <tbody class={`${theme === 'dark' ? 'table-dark': 'table-light'} no-wrap`}>
                    <tr>
                        <td></td>
                        <td class="fecha" ></td>
                        <td class="fecha" ></td>
                        <td ></td>
                        <td ></td>
                        <td ></td>
                        <td ></td>
                        <td ></td>
                        <td ></td>
                        <td ></td>
                        <td ></td>
                    </tr>
                </tbody>
            </table>

        </main>
  )
}
