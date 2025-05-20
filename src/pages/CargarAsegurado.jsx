import React from "react";

export const CargarAsegurado = () => {
  return (
    <main className="mt-5 p-5 col-lg-6 m-auto" >
      <form className="" action="/registro" method="post">
        {/* <div th:if="${param.exito}" className="text-center">
          <p className="alert alert-info">Usuario Registrado Exitosamente!!</p>
        </div> */}
        <div className="d-flex align-items-center justify-content-between gap-2 ">
          <h1 className="h3 fw-normal">
            Cargar Asegurado
          </h1>
        </div>
        <div className="d-flex gap-3">
          <div className="form-floating mb-3 col-md-6">
            <input
              type="text"
              className="form-control"
              id="nombre"
              placeholder="Ej: Juan"
              required
            />
            <label htmlFor="nombre">Ingrese nombre</label>
          </div>
          <div className="form-floating mb-3 col-md-6">
            <input
              type="text"
              className="form-control"
              id="cuit"
              placeholder="Ej: 20-12345678-9"
              required
            />
            <label htmlFor="cuit">Ingrese CUIT</label>
          </div>
          </div>
          <div className="d-flex gap-3">
          <div className="form-floating mb-3 col-md-6">
            <input
              type="tel"
              className="form-control"
              id="telefono"
              placeholder="Ej: 1122334455"
              required
            />
            <label htmlFor="telefono">Ingrese teléfono</label>
          </div>
          <div className="form-floating mb-3 col-md-6">
            <input
              type="tel"
              className="form-control"
              id="telefonoOpcional"
              placeholder="Ej: 1122334455"
            />
            <label htmlFor="telefonoOpcional">
              Ingrese teléfono (opcional)
            </label>
          </div>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Ej: juan@perez.com"
            required
          />
          <label htmlFor="email">Ingrese e-mail</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="empresa"
            placeholder="Ej: Empresa S.A."
            required
          />
          <label htmlFor="empresa">Ingrese empresa</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="prestadorMedico"
            placeholder="Ej: Galeno"
            required
          />
          <label htmlFor="prestadorMedico">Ingrese prestador médico</label>
        </div>
        {/* <div th:if="${error != null}" className="d-flex align-items-center alert alert-danger alert-dismissible fade show py-2" role="alert">
          <p className="mb-0" th:text="${error}"></p>
          <button type="button" className="btn-close pb-1" data-bs-dismiss="alert" aria-label="Close"></button>
        </div> */}
        <button className="btn btn-warning float-end" type="submit">
          Guardar
        </button>
        <p className="mt-5 mb-3 text-white">© 2024 | Estudio Irish</p>
      </form>
    </main>
  );
};
