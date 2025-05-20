import React from 'react'
import { useTheme } from '../../utils/ThemeState';
import { useSelector } from "react-redux";

export const Home = () => {
    const { theme } = useTheme();
    const user = useSelector((state) => state.user.user);


  return (
    <main className="mt-5 px-5">
           
            <h3 className="pt-5">Bienvenido, {user?.nombre.trim()}! </h3>
            
            <br/>
             <h4 className="text-danger">Siniestros vencidos:</h4>
             <h5>No tienes siniestros vencidos!</h5>
               <h4 className="text-success mt-5">Siniestros en gestión:</h4>
            <table className="table table-striped table-hover no-wrap">
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
                      
                    </tr>
                </thead>
                <tbody className={`${theme === 'dark' ? 'table-dark': 'table-light'} no-wrap`}>
                    <tr>
                        <td></td>
                        <td className="fecha" ></td>
                        <td className="fecha" ></td>
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
