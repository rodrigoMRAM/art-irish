import React, { useState, useEffect } from "react";
import useLogin from "../hooks/useLogin";
import EyeOpen from "../assets/visibility.svg?react";
import EyeClosed from "../assets/visibilityOff.svg?react";
export const Login = () => {
  const { loginUser, loading, error } = useLogin();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const rememberedUsername = localStorage.getItem("rememberedUsername");
    if (rememberedUsername) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        username: rememberedUsername,
      }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setRememberMe(checked);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(formData);
      if (rememberMe) {
        localStorage.setItem("rememberedUsername", formData.username);
      } else {
        localStorage.removeItem("rememberedUsername");
      }
      // Redirigir o realizar alguna acción después del login exitoso
    } catch (error) {
      console.error("Usuario o contraseña incorrecto", error);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="form-signin w-100 vh-100 d-flex align-items-center justify-content-center">
      <form onSubmit={handleSubmit} className="w-50">
        <h1 className="h3 mb-3 fw-normal">Inicie Sesión</h1>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            name="username"
            placeholder="name@example.com"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Ingrese su E-mail</label>
        </div>
        <div className="form-floating mb-3 position-relative">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="contra"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="contra">Ingrese Contraseña</label>
          <button
            type="button"
            className="btn  position-absolute end-0 top-0 mt-2 me-2"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <img src={EyeClosed} alt="" />
            ) : (
              <img src={EyeOpen} alt="" />
            )}
          </button>
        </div>

        <div className="form-check text-start my-3">
          <input
            className="form-check-input"
            type="checkbox"
            value="remember-me"
            id="flexCheckDefault"
            checked={rememberMe}
            onChange={handleChange}
          />
          <label
            className="form-check-label dark-mode"
            htmlFor="flexCheckDefault"
          >
            Recuerdame
          </label>
        </div>
        <button
          className="btn btn-warning w-100 py-2"
          type="submit"
          disabled={loading}
        >
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </button>
        {error && <p className="text-danger mt-3">{error}</p>}
        <p className="mt-5 mb-3 text-body-secondary nav-link dark-mode">
          | Estudio <b className="text-warning strong">Irish</b> | © 2025
        </p>
      </form>
    </main>
  );
};
