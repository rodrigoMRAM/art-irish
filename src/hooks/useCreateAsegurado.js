import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

const useCreateAsegurado = () => {
  const token = useSelector((state) => state.user.jwt);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const mutation = useMutation({
    mutationFn: async (aseguradoData) => {
      const response = await fetch(`${API_URL}/asegurados`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(aseguradoData),
      });

      const contentType = response.headers.get("content-type");
      const responseData = contentType?.includes("application/json")
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        throw new Error(responseData?.message || responseData || "Error al crear asegurado");
      }

      return responseData;
    },
  });

  return {
    crearAsegurado: mutation.mutate,
    crearAseguradoAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error?.message,
    reset: mutation.reset,
  };
};

export default useCreateAsegurado;
