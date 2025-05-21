import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const fetchAuditores = async (token) => {
  const response = await fetch(`${API_URL}/auditores`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Error al obtener auditores');
  return response.json();
};

const deleteAuditor = async ({ id, token }) => {
  const response = await fetch(`${API_URL}/auditores/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Error al eliminar auditor');
};

const updateAuditor = async ({ id, data, token }) => {
  const response = await fetch(`${API_URL}/auditores/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al actualizar auditor');
  return response.json();
};

export const useAuditores = () => {
  const token = useSelector((state) => state.user.jwt);
  return useQuery({
    queryKey: ['auditores'],
    queryFn: () => fetchAuditores(token),
  });
};

export const useDeleteAuditor = () => {
  const token = useSelector((state) => state.user.jwt);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }) => deleteAuditor({ id, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(['auditores']);
    },
  });
};

export const useUpdateAuditor = () => {
  const token = useSelector((state) => state.user.jwt);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateAuditor({ id, data, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(['auditores']);
    },
  });
};
