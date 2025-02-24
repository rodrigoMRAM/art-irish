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
                    <tr th:each="siniestro : ${siniestros}">
                        <td th:text="${siniestro.numStro}"></td>
                        <td class="fecha" th:text="${siniestro.fechaIngreso}"></td>
                        <td class="fecha" th:text="${siniestro.fecha_vencimiento}"></td>
                        <td th:text="${siniestro.tipoStro}"></td>
                        <td th:text="${siniestro.resultado}"></td>
                        <td th:text="${siniestro.fechaYHoraStro}"></td>
                        <td th:text="${siniestro.gravedad}"></td>
                        <td th:text="${siniestro.lesiones}"></td>
                        <td th:text="${siniestro.lugar_direccion}"></td>
                        <td th:text="${siniestro.lugar_entrecalles}"></td>
                        <td th:text="${siniestro.localidad}"></td>
                    </tr>
                </tbody>
            </table>

        </main>
  )
}
