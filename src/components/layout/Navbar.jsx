import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { useTheme } from "../../utils/ThemeState";
import useLogout from "../../hooks/useLogout";
import { useSelector } from "react-redux";
import { FaHome } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa";


export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const logout = useLogout();
  const user = useSelector((state) => state.user.user);
  return (
    <nav
      className={`navbar navbar-expand-md ${
        theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"
      } fixed-top shadow`}
      aria-label="Third navbar example"
    >
      <div className="container-fluid">
        <Link className={`navbar-brand`} to={"/home"}>
          | Estudio
          <b>
            <span className="text-warning strong">Irish </span>
          </b>
          |
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample03"
          aria-controls="navbarsExample03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample03">
          <ul className="navbar-nav me-auto mb-2 mb-sm-0 ">
            <li className="nav-item">
              <Link
                className={`nav-link active`}
                aria-current="page"
                to={"/home"}
              >
                <FaHome />
              </Link>
            </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                Herramientas
              </Link>
              <ul className={`dropdown-menu `}>
                <li>
                  <Link className={`dropdown-item`} to={"/asegurado"}>
                    Agregar Asegurado{" "}
                  </Link>
                </li>

                <li>
                  <Link className={`dropdown-item`} to={"/siniestros"}>
                    Cargar Siniestro
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                Consultas
              </Link>
              <ul className={`dropdown-menu`}>
                <li>
                  <Link className={`dropdown-item`} to={"/usuario/listar"}>
                    Usuarios
                  </Link>
                </li>
                <li>
                  <Link className={`dropdown-item`} to={"/siniestros/listar"}>
                    Siniestros
                  </Link>
                </li>
                <li>
                  <Link className={`dropdown-item`} to={"/listar/auditor"}>
                    Auditores
                  </Link>
                </li>
                <li>
                  <Link className={`dropdown-item`} to={"/listar/art"}>
                    Clientes
                  </Link>
                </li>
              </ul>
            </li>
            <Link
              to={"/listar/asegurado"}
              className="btn mx-2 d-flex align-items-center gap-1"
            >
              <FaAddressBook />
              Agenda
            </Link>
          </ul>


          <div className="navbar-nav mb-2 mb-sm-0">
            <li className="nav-item dropdown">
              <Link
                className="text-warning nav-link  dropdown-toggle"
                to="#"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                <b>{user?.nombre + " " + user?.apellido}</b>
              </Link>
              <ul className="dropdown-menu">
                <li className="nav-item dropdown">
                  {" "}
                  <a
                    onClick={logout}
                    className={`dropdown-item dropdown-hover`}
                  >
                    Cerrar Sesión
                  </a>
                </li>
              </ul>
            </li>
          </div>
          <div className="d-flex align-items-center">
            {theme === "dark" ? (
              <MdDarkMode
                className="mx-3"
                style={{ cursor: "pointer" }}
                onClick={toggleTheme}
                title="Cambiar a modo claro"
              />
            ) : (
              <MdLightMode
                className="mx-3"
                style={{ cursor: "pointer" }}
                onClick={toggleTheme}
                title="Cambiar a modo oscuro"
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
