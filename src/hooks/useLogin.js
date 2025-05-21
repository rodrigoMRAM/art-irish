import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';

const loginRequest = async ({ username, password }) => {
  const response = await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Usuario o contraseña incorrectos');
  }

  return response.json();
};

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      dispatch(setUser({ user: data.usuario, jwt: data.token }));
      navigate('/home');
    },
    onError: (error) => {
      // El error ya está disponible como `mutation.error.message`
    },
  });

  return {
    loginUser: mutation.mutate,             // para disparar el login
    loading: mutation.isPending,            // indica si está cargando
    error: mutation.error?.message || null, // mensaje de error si hay
  };
};

export default useLogin;
