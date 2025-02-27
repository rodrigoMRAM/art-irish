import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
const useSiniestros = () => {
  const [siniestros, setSiniestros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        console.log(data)
        setSiniestros(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSiniestros();
  }, []);

 
  const deleteSiniestro = async (id) => {
    console.log(id)
    try {
      const response = await fetch(`http://localhost:8080/api/siniestros/${id}`, {
        method: 'DELETE',
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

  return { siniestros, loading, error, deleteSiniestro };
};

export default useSiniestros;
