import React, { useEffect, useState } from "react";
import useRegister from "../hooks/useRegister";
import EyeOpen from "../assets/visibility.svg?react";
import EyeClosed from "../assets/visibilityOff.svg?react";

export const Registro = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const { register, loading, error, success } = useRegister();
  const [formData, setFormData] = useState({
    dni: "",
    apellido: "",
    nombre: "",
    contra: "",
    email: "",
    rol: "",
  });
  const [contra2, setContra2] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handlePasswordChange = (e) => {
    setContra2(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.contra !== contra2) {
      setPasswordError("Las contraseñas no coinciden");
      setTimeout(() => {
        setPasswordError(null);
      }, 3000);
      return;
    }
    setPasswordError(null);
    await register(formData);
    setContra2("");
  };

  useEffect(() => {
    if (success) {
      setFormData({
        dni: "",
        apellido: "",
        nombre: "",
        contra: "",
        email: "",
        rol: "",
      });
    }
  }, [success]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordRepeat = () => {
    setShowPasswordRepeat(!showPasswordRepeat);
  };
  return (
    <main className="mt-5 p-5 col-lg-6 m-auto">
      <form
        className=""
        action="/registro"
        method="post"
        onSubmit={handleSubmit}
      >
        {success ? (
          <div className="text-center">
            <p className="alert alert-info">
              Usuario Registrado Exitosamente!!
            </p>
          </div>
        ) : (
          ""
        )}

        <div className="d-flex align-items-center justify-content-between gap-2 ">
          <h1 className="h3 fw-normal">Cargar Usuario</h1>

          <div className="form-floating  ">
            <select
              className="form-select form-select mb-3 rol"
              aria-label="Large select example"
              id="rol"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar</option>
              <option value="ADMINISTRADOR">ADMINISTRADOR</option>
              <option className="rol" value="ANALISTA">
                ANALISTA
              </option>
            </select>
            <label htmlFor="rol">Seleccione Rol</label>
          </div>
        </div>
        <div className="form-floating mb-3">
          <input
            type="number"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            className="form-control"
            id="dni"
            placeholder=" ej: 11223344"
            autoFocus="autoFocus"
          />
          <label htmlFor="dni">Ingrese DNI</label>
        </div>
        <div className="d-flex gap-3 ">
          <div className="form-floating mb-3 w-50">
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              id="nombre"
              placeholder=" ej: Juan"
              autoFocus="autoFocus"
            />
            <label htmlFor="nombre">Ingrese nombre</label>
          </div>
          <div className="form-floating mb-3 w-50">
            <input
              type="text"
              className="form-control"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder=" ej: Perez"
              autoFocus="autoFocus"
            />
            <label htmlFor="apellido">Ingrese apellido</label>
          </div>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            id="email"
            placeholder=" ej: juan@perez.com"
            autoFocus="autoFocus"
          />
          <label htmlFor="email">Ingrese e-mail</label>
        </div>
        <div className="d-flex ">
        <div className="mb-3 w-50 position-relative">
          <div className="form-floating">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="contra"
              id="contra"
              value={formData.contra}
              onChange={handleChange}
              placeholder=" su contraseña"
            />
            <label htmlFor="contra">Ingrese Contraseña</label>
          </div>
          <button
            type="button"
            className="btn btn-sm position-absolute top-50 end-0 translate-middle-y me-3"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeClosed /> : <EyeOpen />}
          </button>
        </div>

        <div className="mb-3 w-50 position-relative">
          <div className="form-floating">
          <input
            type={showPasswordRepeat ? "text" : "password"}
            className="form-control"
            id="contra2"
            value={contra2}
            onChange={handlePasswordChange}
            placeholder=" su contraseña"
          />
          <label htmlFor="contra">Repita la Contraseña</label>
          <button
            type="button"
            className="btn  position-absolute end-0 top-0 mt-2 me-2"
            onClick={togglePasswordRepeat}
          >
            {showPassword ? <EyeClosed /> : <EyeOpen />}
          </button>
        </div>

        </div>
        </div>
        {passwordError && (
          <div className="alert alert-danger" role="alert">
            {passwordError}
          </div>
        )}
        {error != null ? (
          <div
            className="d-flex align-items-center alert alert-danger alert-dismissible fade show py-2"
            role="alert"
          >
            <p className="mb-0">{error}</p>
            <button
              type="button"
              className="btn-close pb-1"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        ) : (
          ""
        )}

        <button className="btn btn-warning float-end" type="submit">
          Guardar
        </button>
      </form>
    </main>
  );
};
