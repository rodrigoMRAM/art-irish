import React from "react";
import { useGetContactos } from "../hooks/useGetAsegurados";
import { ToastContainer } from "react-toastify";
import { useTheme } from "../utils/ThemeState";
import { getColorById } from "../utils/getBootstrapColor";
import { MdUnfoldMore, MdExpandMore, MdPersonSearch  } from "react-icons/md";

export const ListarAsegurados = () => {
  const { data: contactos = [], isLoading, isError, error } = useGetContactos();
  const { theme } = useTheme();

  if (isLoading) return <p>Cargando contactos…</p>;
  if (isError) return <div className="alert alert-danger">{error.message}</div>;

return (
    <main className="mt-5 px-5">
        <div className="mt-5 input-group mb-3 w-50">
            <input
                type="text"
                className="form-control"
                placeholder="Buscar contacto"
                aria-label="Recipient’s username"
                aria-describedby="button-addon2"
            />
            <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
            >
                <MdPersonSearch size={25} />
            </button>
        </div>
        <div className="table-responsive">
            <table
                className={`table table-striped table-hover no-wrap ${
                    theme === "dark" ? "table-dark" : ""
                }`}
            >
                <thead>
                    <tr>
                        <th style={{ cursor: "pointer" }}>
                            Nombre y apellido <MdUnfoldMore />
                        </th>
                        <th>DNI</th>
                        <th>Teléfono</th>
                        <th>Teléfono 2</th>
                        <th style={{ cursor: "pointer" }}>
                            Email <MdUnfoldMore />
                        </th>
                        <th style={{ cursor: "pointer" }}>
                            Empresa <MdExpandMore />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {contactos.map((c) => {
                        const aseguradoId = c.asegurado?.idAsegurado;
                        const color = getColorById(aseguradoId);
                        return (
                            <tr key={c.idContactoAsegurado}>
                                <td className="text-capitalize fw-bold">
                                    {c.nombre} {c.apellido}
                                </td>
                                <td>{c.dni}</td>
                                <td>{c.telefono || "Sin datos"}</td>
                                <td>{c.telefono2 || "--"}</td>
                                <td>
                                    {c.email ? (
                                        <a
                                            href={`mailto:${c.email}`}
                                            className="text-decoration-none text-warning fw-bold"
                                        >
                                            {c.email}
                                        </a>
                                    ) : (
                                        "Sin datos"
                                    )}
                                </td>
                                <td>
                                    <span
                                        style={{ cursor: "pointer" }}
                                        className={
                                            `border border-${color} border-opacity-25 py-1 px-2 ` +
                                            `bg-${color}-subtle text-${color}-emphasis rounded`
                                        }
                                    >
                                        {c.asegurado?.empresa || "Sin datos"}
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        <ToastContainer position="bottom-right" autoClose={1500} theme={theme} />
    </main>
);
};
