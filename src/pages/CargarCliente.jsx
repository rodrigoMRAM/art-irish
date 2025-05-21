import React from "react";

export const CargarCliente = () => {
  return (
    <main className="mt-5 p-5 col-lg-6 m-auto" >
      <form className="" action="/registro" method="post">
        
        <div className="d-flex align-items-center justify-content-between gap-2 ">
          <h1 className="h3 fw-normal">
            Nuevo Cliente
          </h1>
        </div>
        
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="cliente"
            placeholder="Ej: prevencion ART"
            required
          />
          <label htmlFor="cliente">Nombre ART</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="nombre"
            placeholder="Ej: Juan"
            required
          />
          <label htmlFor="nombre">Nombre Analista</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="apellido"
            placeholder="Ej: Perez"
            required
          />
          <label htmlFor="apellido">Apellido Analista</label>
        </div>
      
        <button className="btn btn-warning float-end" type="submit">
          Guardar
        </button>
       
      </form>
    </main>
  );
};
