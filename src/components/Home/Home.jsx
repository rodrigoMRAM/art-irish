import React from "react";
import { useTheme } from "../../utils/ThemeState";
import { useSelector } from "react-redux";
import {
  useSiniestros,
  useCrearSiniestro,
  useDeleteSiniestro,
  useUpdateSiniestro,
  useAssignAnalista,
} from "../../hooks/useSiniestro";
import formatDate from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { data: siniestros = [], isLoading, error } = useSiniestros();
  const { theme } = useTheme();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const handleSummary = (siniestro) => {
    navigate("/resumen", { state: { formData: siniestro } });
  };

  const siniestrosAnalista = siniestros.filter((data) => data?.analista?.dni == user?.dni);

return (
    <main className="mt-5 px-5">
        <h3 className="pt-5">Bienvenido, {user?.nombre.trim()}! </h3>

        <br />

        <h4 className="text-success mt-5">Siniestros en gestión: {siniestrosAnalista.length}</h4>
        <div className="table-responsive">
            <table className="table table-striped table-hover no-wrap">
                <thead
                    className={`${
                        theme === "dark" ? "table-dark" : "table-light"
                    } no-wrap`}
                >
                    <tr>
                        <th>Número Stro.</th>
                        <th>Asegurado</th>
                        <th>Cliente</th>
                        <th>Accidentado</th>
                        <th>Vencimiento</th>
                        <th>Tipo de inv.</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className={`no-wrap table-group-divider`}>
                    {siniestros
                        .filter((data) => data?.analista?.dni == user?.dni)
                        .map((data) => (
                            <tr
                                key={data.idStro}
                                style={{ cursor: "pointer" }}
                                onClick={() => handleSummary(data)}
                            >
                                <td>{data.numStro}</td>
                                <td className="fecha">{data?.art?.nombreAnalista}</td>
                                <td>{data.art?.nombreART}</td>
                                <td>
                                    {data.trabajador?.nombre + " " + data.trabajador?.apellido}
                                </td>
                                <td
                                    className={
                                        data.fecha_vencimiento <= formatDate(Date.now())
                                            ? "fecha bg-danger"
                                            : "fecha bg-success"
                                    }
                                >
                                    {formatDate(data.fecha_vencimiento)}
                                </td>
                                <td>{data.tipoInvestigacion}</td>
                             
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    </main>
);
};
