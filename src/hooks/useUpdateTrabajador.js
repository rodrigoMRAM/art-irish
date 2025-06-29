import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const useUpdateTrabajador = () => {
  const token = useSelector((state) => state.user.jwt);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await fetch(`${API_URL}/trabajadores/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al actualizar trabajador');
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trabajadores'] });
    },
    onError: (error) => {
      console.error('Error actualizando trabajador:', error.message);
    },
  });
};