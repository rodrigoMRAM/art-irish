import React from "react";

export const CargarAuditor = () => {
  return (
    <main className="mt-5 p-5 col-lg-6 m-auto" >
      <form className="" action="/registro" method="post">
        {/* <div th:if="${param.exito}" className="text-center">
          <p className="alert alert-info">Usuario Registrado Exitosamente!!</p>
        </div> */}
        <div className="d-flex align-items-center justify-content-between gap-2 ">
          <h1 className="h3 fw-normal">
            Cargar Auditor
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
            <label htmlFor="cuit">Ingrese Apellido</label>
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
            type="number"
            className="form-control"
            id="dni"
            placeholder="Ej: 22345678"
            required
          />
          <label htmlFor="dni">Ingrese DNI</label>
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
            id="domicilio"
            placeholder="Ej: Empresa S.A."
            required
          />
          <label htmlFor="domicilio">Ingrese Domicilio</label>
        </div>
        <div className="d-flex gap-3">
        <div className="form-floating mb-3 col-md-4">
          <input
            type="number"
            className="form-control"
            id="cp"
            placeholder="Ej: 1425"
            required
          />
          <label htmlFor="cp">Ingrese CP</label>
        </div>
        <div className="form-floating mb-3 col-md-8">
          <input
            type="text"
            className="form-control"
            id="localidad"
            placeholder="Ej: Quilmes"
            required
          />
          <label htmlFor="localidad">Ingrese Localidad</label>
        </div>
        </div>
        <button className="btn btn-warning float-end" type="submit">
          Guardar
        </button>
      </form>
    </main>
  );
};
