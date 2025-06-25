import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const fetchArts = async (token) => {
  const response = await fetch(`${API_URL}/arts`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Error al obtener arts');
  return response.json();
};

const deleteArt = async ({ idART, token }) => {
  const response = await fetch(`${API_URL}/arts/${idART}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Error al eliminar art');
};

const updateArt = async ({ idART, data, token }) => {
  const response = await fetch(`${API_URL}/arts/${idART}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al actualizar art');
  return response.json();
};

export const useArts = () => {
  const token = useSelector((state) => state.user.jwt);
  return useQuery({
    queryKey: ['arts'],
    queryFn: () => fetchArts(token),
    enabled: !!token,
  });
};

export const useDeleteArt = () => {
  const token = useSelector((state) => state.user.jwt);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ idART }) => deleteArt({ idART, token }),
  });
};

export const useUpdateArt = () => {
  const token = useSelector((state) => state.user.jwt);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ idART, data }) => updateArt({ idART, data, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(['arts']);
    },
  });
};
