import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = async (credentials) => {
    console.log(credentials)
    const { username, password } = credentials;
    console.log(username)
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Usuario o contraseña incorrectos');
      }

      const data = await response.json();

      // Guarda el usuario en Redux
      dispatch(setUser({ user: data.usuario, jwt: data.token }));
      navigate('/home');
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loginUser,
    loading,
    error,
  };
};

export default useLogin;