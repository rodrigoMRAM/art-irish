import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateTrabajador = () => {
  const token = useSelector((state) => state.user.jwt);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formDataTrabajador) => {
      const res = await fetch(`${API_URL}/trabajadores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formDataTrabajador),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al crear trabajador');
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trabajadores'] });
    },
    onError: (error) => {
      console.error('Error creando trabajador:', error.message);
    },
  });

  return mutation;
};
