import React from 'react'

export const Registro = () => {
  return (
    <main class="mt-5 p-5 col-lg-6 m-auto">
       
           <form class="" th:action="@{/registro}" method="post" th:object="${usuario}">
                {/* <div th:if="${param.exito}" class="text-center">
               <p class="alert alert-info">Usuario Registrado Exitosamente!!</p>
           </div> */}
    <div class="d-flex align-items-center justify-content-between gap-2 ">
    <h1 class="h3 fw-normal text-white dark-mode">Cargar Usuario</h1>
    
     <div class="form-floating  ">
            <select class="form-select form-select mb-3 rol" aria-label="Large select example" id="rol" th:field="*{rol}" required>
                <option disabled selected value="">Rol de Usuario</option>
                <option th:each="rol : ${roles}" th:value="${rol}" th:text="${rol}" class="rol">Rol</option>
            </select>
            <label for="rol">Seleccione Rol</label>
        </div>
    </div>
    <div class="form-floating mb-3">
      <input type="number" class="form-control" id="dni" th:field="*{dni}" placeholder=" ej: 11223344"  autofocus="autofocus"/>
      <label for="dni">Ingrese DNI</label>
    </div>
    <div class="d-flex gap-2 ">
    <div class="form-floating mb-3 w-50">
    <input type="text" class="form-control" id="nombre" th:field="*{nombre}" placeholder=" ej: Juan"  autofocus="autofocus"/>
      <label for="nombre">Ingrese nombre</label>
    </div>
    <div class="form-floating mb-3 w-50">
    <input type="text" class="form-control" id="apellido" th:field="*{apellido}" placeholder=" ej: Perez"  autofocus="autofocus"/>
      <label for="apellido">Ingrese apellido</label>
    </div>
        </div>
    <div class="form-floating mb-3">
     <input type="email" class="form-control" id="email" th:field="*{email}" placeholder=" ej: juan@perez.com"  autofocus="autofocus"/>
      <label for="email">Ingrese e-mail</label>
    </div>
     <div class="form-floating mb-3">
    <input type="number" class="form-control" id="cel" th:field="*{cel}" placeholder=" ej: 11223344"  autofocus="autofocus"/>
      <label for="cel">Ingrese su celular</label>
    </div>
      <div class="d-flex gap-2 ">
    <div class="form-floating mb-3 w-50">
     <input type="password" class="form-control" id="contra" th:field="*{contra}" placeholder=" su contraseña"  autofocus="autofocus"/>
      <label for="contra">Ingrese Contraseña</label>
    </div>
      <div class="form-floating mb-3 w-50">
     <input type="password" class="form-control" id="contra2"  placeholder=" su contraseña" />
      <label for="contra">Repita la Contraseña</label>
    </div>
      </div>
   {/* <div th:if="${error != null}" class="d-flex align-items-center alert alert-danger alert-dismissible fade show py-2" role="alert">
                    <p class="mb-0"  th:text="${error}"></p>
                    <button type="button" class="btn-close pb-1" data-bs-dismiss="alert" aria-label="Close"></button>
                </div> */}
    <button class="btn btn-warning float-end" type="submit">Guardar</button>
    
    <p class="mt-5 mb-3 text-white">© 2024 | Estudio Irish</p>
  </form>
</main>
  )
}
