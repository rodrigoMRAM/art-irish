import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.jwt);
  
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:8080/usuario/listar', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Enviar el token en la cabecera
          },
        });
        if (!response.ok) {
          throw new Error('Error al cargar los usuarios');
        }
        const data = await response.json();
        setUsuarios(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);
  const deleteUsuario = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }

      // Filtramos el usuario eliminado para actualizar el estado
      setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.dni !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const editUsuario = async (id, updatedData) => {
    console.log(id, updatedData)
    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Error al editar el usuario');
      }

      const updatedUsuario = await response.json();

      // Actualizamos el estado con el usuario editado
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.dni === id ? updatedUsuario : usuario
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return { usuarios, loading, error, deleteUsuario, editUsuario };
};

export default useListaUsuarios;