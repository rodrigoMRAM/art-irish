import React from 'react'

export const Login = () => {
  return (
    <main className="form-signin w-100 vh-100 d-flex align-items-center justify-content-center">
  <form action="/login" method="post"  className="w-50">
    
    <h1 className="h3 mb-3 fw-normal">Inicie Sesión</h1>

    <div className="form-floating mb-3">
      <input type="email" className="form-control" id="email" name="username" placeholder="name@example.com"  />
      <label for="email">Ingrese su E-mail</label>
    </div>
    <div className="form-floating mb-3">
        <input type="password" className="form-control" id="contra" name="password" placeholder="Password" required/>
      <label for="contra">Ingrese Contraseña</label>
    </div>

    <div className="form-check text-start my-3">
      <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
      <label className="form-check-label" for="flexCheckDefault">
        Remember me
      </label>
    </div>
    <input className="btn btn-warning w-100 py-2" type="submit" id="login-submit" value="Iniciar Sesión"/>
    
    <p className="mt-5 mb-3 text-body-secondary nav-link dark-mode">| Estudio <b className="text-warning strong">Irish</b> | © 2025</p>
  </form>
</main>
  )
}
