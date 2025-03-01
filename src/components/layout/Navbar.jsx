import React , { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import { useTheme } from '../../utils/ThemeState'
import useLogout from '../../hooks/useLogout'
import { useSelector } from 'react-redux';

export const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const logout = useLogout();
    const user = useSelector((state) => state.user.user);
  return (
    <nav className={`navbar navbar-expand-sm navbar-dark ${theme === 'dark' ?  'bg-dark' : 'bg-light'} shadow `} aria-label="Third navbar example">
    <div className="container-fluid">
        <Link className={`navbar-brand text-white dark-mode`} to={"/home"} >| Estudio<b><span className="text-warning strong">Irish </span></b>|</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample03">
            <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                <li className="nav-item">
                    <Link className={`nav-link dark-mode active text-white`} aria-current="page" to={"/home"} >Home</Link>
                </li>


                <li className="nav-item dropdown">
                    <Link className="nav-link dark-mode dropdown-toggle" to="#" data-bs-toggle="dropdown" aria-expanded="true">Herramientas</Link>
                    <ul className="dropdown-menu bg-dark">
                        <li><Link className="dropdown-item text-light dropdown-hover" to={"/asegurado"}>Agregar Asegurado </Link></li>
                        <li><Link className="dropdown-item text-light dropdown-hover" to={"#"}>Agregar Auditor</Link></li>
                        <li><Link className="dropdown-item text-light dropdown-hover" to={"/siniestros"}>Cargar Siniestro</Link></li>

                    </ul>
                </li>
                
                <li className="nav-item dropdown">
                    <Link className="nav-link dark-mode dropdown-toggle" to="#" data-bs-toggle="dropdown" aria-expanded="true">Consultas</Link>
                    <ul className="dropdown-menu bg-dark">
                        <li><Link className="dropdown-item text-light dropdown-hover" to={"/usuario/listar"}>Listar Usuarios</Link></li>
                        <li><Link className="dropdown-item text-light dropdown-hover" to={"/siniestros/listar"}>Ver Siniestros</Link></li>
                        <li><Link className="dropdown-item text-light dropdown-hover" to={"#"}>Listar Auditores</Link></li>
                        <li><Link className="dropdown-item text-light dropdown-hover" to={"#"}>Ver Clientes</Link></li>

                    </ul>
                </li>
                
                <li className="nav-item">
                    <Link className="nav-link dark-mode active" to={"/registro"}>Nuevo Usuario</Link>
                </li>
            </ul>

            <div className="navbar-nav mb-2 mb-sm-0">
                <li className="nav-item dropdown">
                    <Link className="text-warning nav-link  dropdown-toggle"  to="#" data-bs-toggle="dropdown" aria-expanded="true"><b>{user.nombre+ ' '+ user.apellido }</b></Link>
                    <ul className="dropdown-menu bg-dark">
                        <li> <a onClick={logout} className="dropdown-item text-warning">Cerrar Sesión</a></li>   
                    </ul>  
                </li>
            </div>
            <div className="vr dark-mode"></div>
            <div className="d-flex align-items-center">
                {theme === 'dark' ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-moon-stars-fill mx-3" viewBox="0 0 16 16">
  <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
  <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/>
</svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="#ffc107" className=' mx-3'>
<path d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z" fill="#ffc107;"/>
<path d="M8 0C8.27614 0 8.5 0.223858 8.5 0.5V2.5C8.5 2.77614 8.27614 3 8 3C7.72386 3 7.5 2.77614 7.5 2.5V0.5C7.5 0.223858 7.72386 0 8 0Z" fill="#ffc107"/>
<path d="M8 13C8.27614 13 8.5 13.2239 8.5 13.5V15.5C8.5 15.7761 8.27614 16 8 16C7.72386 16 7.5 15.7761 7.5 15.5V13.5C7.5 13.2239 7.72386 13 8 13Z" fill="#ffc107"/>
<path d="M16 8C16 8.27614 15.7761 8.5 15.5 8.5H13.5C13.2239 8.5 13 8.27614 13 8C13 7.72386 13.2239 7.5 13.5 7.5H15.5C15.7761 7.5 16 7.72386 16 8Z" fill="#ffc107"/>
<path d="M3 8C3 8.27614 2.77614 8.5 2.5 8.5H0.5C0.223858 8.5 -1.20706e-08 8.27614 0 8C1.20706e-08 7.72386 0.223858 7.5 0.5 7.5H2.5C2.77614 7.5 3 7.72386 3 8Z" fill="#ffc107"/>
<path d="M13.6569 2.34318C13.8521 2.53844 13.8521 2.85502 13.6569 3.05028L12.2426 4.4645C12.0474 4.65976 11.7308 4.65976 11.5355 4.4645C11.3403 4.26924 11.3403 3.95265 11.5355 3.75739L12.9497 2.34318C13.145 2.14792 13.4616 2.14792 13.6569 2.34318Z" fill="#ffc107"/>
<path d="M4.46446 11.5356C4.65973 11.7308 4.65973 12.0474 4.46446 12.2427L3.05025 13.6569C2.85499 13.8521 2.53841 13.8521 2.34314 13.6569C2.14788 13.4616 2.14788 13.145 2.34314 12.9498L3.75736 11.5356C3.95262 11.3403 4.2692 11.3403 4.46446 11.5356Z" fill="#ffc107"/>
<path d="M13.6569 13.6569C13.4616 13.8522 13.145 13.8522 12.9497 13.6569L11.5355 12.2427C11.3403 12.0474 11.3403 11.7308 11.5355 11.5356C11.7308 11.3403 12.0474 11.3403 12.2426 11.5356L13.6569 12.9498C13.8521 13.1451 13.8521 13.4616 13.6569 13.6569Z" fill="#ffc107"/>
<path d="M4.46447 4.46451C4.2692 4.65977 3.95262 4.65977 3.75736 4.46451L2.34315 3.0503C2.14788 2.85503 2.14788 2.53845 2.34315 2.34319C2.53841 2.14793 2.85499 2.14793 3.05025 2.34319L4.46447 3.7574C4.65973 3.95267 4.65973 4.26925 4.46447 4.46451Z" fill="#ffc107"/>
</svg>}
                                          

  <div className="form-check form-switch">
                <label className="form-check-label" htmlFor="flexSwitchCheckChecked"></label>
  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"  checked={theme === 'dark' ? true : false} onClick={toggleTheme} 
 />
</div>
            </div>
 
           
        </div>
    </div>
</nav>

  )
}
