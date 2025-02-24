import React from 'react'
import { useTheme } from '../utils/ThemeState';

export const ListarSiniestros = () => {
    const { theme } = useTheme();
  return (
    <main class="mt-5 px-5">
            {/* <div th:if="${param.exito}" class="text-center">
                <p class="alert alert-info">Siniestro cargado Exitosamente!!</p>
            </div> */}
            <h2 class="pt-5">Lista de Siniestros</h2>
            <br/>
            
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
                        <th>Provincia</th>
                        <th>Prestador Médico</th>
                        <th>Patologías Inculpables</th>
                        <th>Modificar</th>
                        <th>Eliminar</th>
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
                        <td th:text="${siniestro.provincia}"></td>
                        <td th:text="${siniestro.nombrePrestadorMedico}"></td>                   
                        <td th:text="${siniestro.patologiasInculpables}"></td>

                        <td><a class="btn btn-success btn-sm">Modificar</a></td>
                        <td><a class="btn btn-danger btn-sm">Eliminar</a></td>
                    </tr>
                </tbody>
            </table>

        </main>
  )
}
