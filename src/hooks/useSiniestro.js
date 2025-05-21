import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

const useSiniestros = () => {
  const [siniestros, setSiniestros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const token = useSelector((state) => state.user.jwt);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchSiniestros = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/siniestros`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Error al cargar los siniestros");
      const data = await response.json();
      setSiniestros(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [API_URL, token]);

  useEffect(() => {
    fetchSiniestros();
  }, [fetchSiniestros]);

  const crearSiniestro = async (payload) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/siniestros`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Error al crear el siniestro");
      const data = await response.json();
      setSiniestros((prev) => [...prev, data]);
      setSuccess(true);
      setError(null);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteSiniestro = async (id) => {
    try {
      const response = await fetch(`${API_URL}/siniestros/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Error al eliminar el siniestro");
      setSiniestros((prev) => prev.filter((s) => s.idStro !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const updateSiniestros = async (id, updatedData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/siniestros/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error("Error al editar el siniestro");
      const data = await response.json();
      setSiniestros((prev) => prev.map((s) => (s.idStro === id ? data : s)));
      setSuccess(true);
      setError(null);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const assignAnalista = async (idStro, analistaId) => {
    try {
      const res = await fetch(`${API_URL}/siniestros/${idStro}/analista`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ analistaId }), // uuid-string o null
      });
      if (!res.ok) throw new Error("No se pudo asignar analista");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);

      setSiniestros((prev) =>
        prev.map((s) =>
          s.idStro === idStro
            ? { ...s, analista: analistaId ? { id: analistaId } : null }
            : s
        )
      );
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  return {
    siniestros,
    loading,
    error,
    success,
    crearSiniestro,
    deleteSiniestro,
    updateSiniestros,
    assignAnalista,
  };
};

export default useSiniestros;
