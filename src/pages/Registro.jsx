import React from 'react'

export const Registro = () => {
  return (
    <main className="mt-5 p-5 col-lg-6 m-auto">
       
           <form className="" action="/registro" method="post">
                {/* <div th:if="${param.exito}" className="text-center">
               <p className="alert alert-info">Usuario Registrado Exitosamente!!</p>
           </div> */}
    <div className="d-flex align-items-center justify-content-between gap-2 ">
    <h1 className="h3 fw-normal text-white dark-mode">Cargar Usuario</h1>
    
     <div className="form-floating  ">
            <select className="form-select form-select mb-3 rol" aria-label="Large select example" id="rol" required>
                <option disabled selected value="">Rol de Usuario</option>
                <option  className="rol">Rol</option>
            </select>
            <label for="rol">Seleccione Rol</label>
        </div>
    </div>
    <div className="form-floating mb-3">
      <input type="number" className="form-control" id="dni" placeholder=" ej: 11223344"  autofocus="autofocus"/>
      <label for="dni">Ingrese DNI</label>
    </div>
    <div className="d-flex gap-2 ">
    <div className="form-floating mb-3 w-50">
    <input type="text" className="form-control" id="nombre" placeholder=" ej: Juan"  autofocus="autofocus"/>
      <label for="nombre">Ingrese nombre</label>
    </div>
    <div className="form-floating mb-3 w-50">
    <input type="text" className="form-control" id="apellido"  placeholder=" ej: Perez"  autofocus="autofocus"/>
      <label for="apellido">Ingrese apellido</label>
    </div>
        </div>
    <div className="form-floating mb-3">
     <input type="email" className="form-control" id="email" placeholder=" ej: juan@perez.com"  autofocus="autofocus"/>
      <label for="email">Ingrese e-mail</label>
    </div>
     <div className="form-floating mb-3">
    <input type="number" className="form-control" id="cel"  placeholder=" ej: 11223344"  autofocus="autofocus"/>
      <label for="cel">Ingrese su celular</label>
    </div>
      <div className="d-flex gap-2 ">
    <div className="form-floating mb-3 w-50">
     <input type="password" className="form-control" id="contra" placeholder=" su contraseña"  autofocus="autofocus"/>
      <label for="contra">Ingrese Contraseña</label>
    </div>
      <div className="form-floating mb-3 w-50">
     <input type="password" className="form-control" id="contra2"  placeholder=" su contraseña" />
      <label for="contra">Repita la Contraseña</label>
    </div>
      </div>
   {/* <div th:if="${error != null}" className="d-flex align-items-center alert alert-danger alert-dismissible fade show py-2" role="alert">
                    <p className="mb-0"  th:text="${error}"></p>
                    <button type="button" className="btn-close pb-1" data-bs-dismiss="alert" aria-label="Close"></button>
                </div> */}
    <button className="btn btn-warning float-end" type="submit">Guardar</button>
    
    <p className="mt-5 mb-3 text-white">© 2024 | Estudio Irish</p>
  </form>
</main>
  )
}
