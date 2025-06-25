import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const useDeleteTrabajador = () => {
  const token = useSelector((state) => state.user.jwt);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }) => {
      const res = await fetch(`${API_URL}/trabajadores/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al eliminar trabajador');
      }

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trabajadores'] });
    },
    onError: (error) => {
      console.error('Error eliminando trabajador:', error.message);
    },
  });
};