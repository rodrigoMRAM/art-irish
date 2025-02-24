import React from 'react'

export const Login = () => {
  return (
    <main class="form-signin w-100 vh-100 d-flex align-items-center justify-content-center">
  <form th:action="@{/login}" method="post"  class="w-50">
    
    <h1 class="h3 mb-3 fw-normal">Inicie Sesión</h1>

    <div class="form-floating mb-3">
      <input type="email" class="form-control" id="email" name="username" placeholder="name@example.com"  />
      <label for="email">Ingrese su E-mail</label>
    </div>
    <div class="form-floating mb-3">
        <input type="password" class="form-control" id="contra" name="password" placeholder="Password" required/>
      <label for="contra">Ingrese Contraseña</label>
    </div>

    <div class="form-check text-start my-3">
      <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
      <label class="form-check-label" for="flexCheckDefault">
        Remember me
      </label>
    </div>
    <input class="btn btn-warning w-100 py-2" type="submit" id="login-submit" value="Iniciar Sesión"/>
    
    <p class="mt-5 mb-3 text-body-secondary nav-link dark-mode">| Estudio <b class="text-warning strong">Irish</b> | © 2025</p>
  </form>
</main>
  )
}
