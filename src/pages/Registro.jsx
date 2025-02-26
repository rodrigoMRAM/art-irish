import React, { useState } from 'react'
import useRegister from '../hooks/useRegister';

export const Registro = () => {

  const { register, loading, error, success } = useRegister();
  const [formData, setFormData] = useState({
    dni: '',
    apellido: '',
    nombre: '',
    contra: '',
    email: '',
    rol: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(formData);
  };

  return (
    <main className="mt-5 p-5 col-lg-6 m-auto">
       
           <form className="" action="/registro" method="post" onSubmit={handleSubmit}>
                {/* <div th:if="${param.exito}" className="text-center">
               <p className="alert alert-info">Usuario Registrado Exitosamente!!</p>
           </div> */}
    <div className="d-flex align-items-center justify-content-between gap-2 ">
    <h1 className="h3 fw-normal text-white dark-mode">Cargar Usuario</h1>
    
     <div className="form-floating  ">
            <select className="form-select form-select mb-3 rol" aria-label="Large select example" id="rol" name='rol' value={formData.rol} onChange={handleChange} required>
                <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                <option className="rol" value="ANALISTA">ANALISTA</option>
            </select>
            <label htmlFor="rol">Seleccione Rol</label>
        </div>
    </div>
    <div className="form-floating mb-3">
      <input type="number" name='dni' value={formData.dni} onChange={handleChange} className="form-control" id="dni" placeholder=" ej: 11223344"  autoFocus="autoFocus"/>
      <label htmlFor="dni">Ingrese DNI</label>
    </div>
    <div className="d-flex gap-2 ">
    <div className="form-floating mb-3 w-50">
    <input type="text" className="form-control" name='nombre' value={formData.nombre} onChange={handleChange}id="nombre" placeholder=" ej: Juan"  autoFocus="autoFocus"/>
      <label htmlFor="nombre">Ingrese nombre</label>
    </div>
    <div className="form-floating mb-3 w-50">
    <input type="text" className="form-control" id="apellido" name='apellido' value={formData.apellido} onChange={handleChange} placeholder=" ej: Perez"  autoFocus="autoFocus"/>
      <label htmlFor="apellido">Ingrese apellido</label>
    </div>
        </div>
    <div className="form-floating mb-3">
     <input type="email" className="form-control" name='email' value={formData.email} onChange={handleChange} id="email" placeholder=" ej: juan@perez.com"  autoFocus="autoFocus"/>
      <label htmlFor="email">Ingrese e-mail</label>
    </div>
      <div className="d-flex gap-2 ">
    <div className="form-floating mb-3 w-50">
     <input type="password" className="form-control" name="contra" id="contra" value={formData.contra} onChange={handleChange} placeholder=" su contraseña"  autoFocus="autoFocus"/>
      <label htmlFor="contra">Ingrese Contraseña</label>
    </div>
      <div className="form-floating mb-3 w-50">
     <input type="password" className="form-control" id="contra2"  placeholder=" su contraseña" />
      <label htmlFor="contra">Repita la Contraseña</label>
    </div>
      </div>
   {/* <div th:if="${error != null}" className="d-flex align-items-center alert alert-danger alert-dismissible fade show py-2" role="alert">
                    <p className="mb-0"  th:text="${error}"></p>
                    <button type="button" className="btn-close pb-1" data-bs-dismiss="alert" aria-label="Close"></button>
                </div> */}
    <button className="btn btn-warning float-end" type="submit">Guardar</button>
    
  </form>
</main>
  )
}
