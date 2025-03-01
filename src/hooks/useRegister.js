import { useState } from 'react';
import { useSelector } from 'react-redux';

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const token = useSelector((state) => state.user.jwt);

  const register = async ({ dni, apellido, nombre, contra, email, rol }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    console.log({ dni, apellido, nombre, contra, email, rol })
   
    try {
      const response = await fetch('http://localhost:8080/usuario/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify({ dni, apellido, nombre, contra, email, rol }),
      });

      if (!response.ok) {
        throw new Error('Error al registrar el usuario');
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, success };
};

export default useRegister;