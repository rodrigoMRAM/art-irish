import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

const useCrearArt = () => {
  const token = useSelector((state) => state.user.jwt);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const mutation = useMutation({
    mutationFn: async ({ nombreART, nombreAnalista, apellidoAnalista }) => {
      const response = await fetch(`${API_URL}/arts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombreART,
          nombreAnalista,
          apellidoAnalista,
        }),
      });

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw new Error(data || 'Error al crear ART');
      }

      return data;
    },
  });

  return {
    crearArt: mutation.mutate,
    loading: mutation.isPending,
    error: mutation.error?.message || null,
    success: mutation.isSuccess,
    data: mutation.data,
  };
};

export default useCrearArt;
