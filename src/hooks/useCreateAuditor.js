import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const useCreateAuditor = () => {
  const token = useSelector((state) => state.user.jwt);

  const mutation = useMutation({
    mutationFn: async ({ dni, nombre, apellido, cp, localidad, domicilio }) => {
      const response = await fetch(`${API_URL}/auditores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          dni,
          nombre,
          apellido,
          cp,
          localidad,
          domicilio,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear auditor');
      }

      return response.json();
    },
  });

  return mutation;
};

export default useCreateAuditor;
