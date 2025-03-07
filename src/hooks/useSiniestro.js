import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useSiniestros = () => {
  const [siniestros, setSiniestros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const token = useSelector((state) => state.user.jwt);

  useEffect(() => {
    const fetchSiniestros = async () => {
      try {
        const response = await fetch('http://localhost:8080/siniestros', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Enviar el token en la cabecera
          },
        });
        if (!response.ok) {
          throw new Error('Error al cargar los siniestros');
        }
        const data = await response.json();
        setSiniestros(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSiniestros();
  }, []);

  const crearSiniestro = async ({numStro,
    fechaYHoraStro,
    tipoInvestigacion,
    lugar_direccion,
    lugar_entrecalles,
    localidad,
    provincia,
    mechanicaHecho,
    gravedad,
    nombrePrestadorMedico,
    lesiones,
    patologiasInculpables,
    tipoStro,
    resultado,
    tieneRecupero,
    observaciones}) => {
    try {
      const response = await fetch('http://localhost:8080/siniestros', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Enviar el token en la cabecera
        },
        body: JSON.stringify({ numStro,
          fechaYHoraStro,
          tipoInvestigacion,
          lugar_direccion,
          lugar_entrecalles,
          localidad,
          provincia,
          mechanicaHecho,
          gravedad,
          nombrePrestadorMedico,
          lesiones,
          patologiasInculpables,
          tipoStro,
          resultado,
          tieneRecupero,
          observaciones} ),
      });
      if (!response.ok) {
        throw new Error('Error al cargar los siniestros');
      }
      const data = await response.json();
      setSiniestros(data);
      setSuccess(true);
      setError(null);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



 
  const deleteSiniestro = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/siniestros/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Enviar el token en la cabecera
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el siniestro');
      }

      // Filtramos el siniestro eliminado para actualizar el estado
      setSiniestros((prevSiniestros) => prevSiniestros.filter((siniestro) => siniestro.idStro !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const updateSiniestros = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:8080/siniestros/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Error al editar el siniestro');
      }

      const updatedSiniestro = await response.json();
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
      setSiniestros((prevSiniestros) =>
        prevSiniestros.map((siniestro) =>
          siniestro.idStro === id ? updatedSiniestro : siniestro
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return { siniestros, loading, error, success, deleteSiniestro,crearSiniestro ,updateSiniestros};
};

export default useSiniestros;
