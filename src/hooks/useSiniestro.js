import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

const useSiniestros = () => {
  const token = useSelector((state) => state.user.jwt);
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const queryClient = useQueryClient();

  // 1. Fetch principal
  const { data: siniestros = [], isLoading, error } = useQuery({
    queryKey: ['siniestros'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/siniestros`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Error al cargar los siniestros');
      return res.json();
    },
  });

  // 2. Crear siniestro
  const crearMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await fetch(`${API_URL}/siniestros`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Error al crear el siniestro');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siniestros'] });
    },
  });

  // 3. Eliminar siniestro
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${API_URL}/siniestros/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Error al eliminar el siniestro');
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siniestros'] });
    },
  });

  // 4. Editar siniestro
  const updateMutation = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const res = await fetch(`${API_URL}/siniestros/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error('Error al editar el siniestro');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siniestros'] });
    },
  });

  // 5. Asignar analista
  const assignMutation = useMutation({
    mutationFn: async ({ idStro, analistaId }) => {
      const res = await fetch(`${API_URL}/siniestros/${idStro}/analista`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ analistaId }),
      });
      if (!res.ok) throw new Error('No se pudo asignar analista');
      return { idStro, analistaId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siniestros'] });
    },
  });

    
  return {
    siniestros,
    loading: isLoading,
    error: error?.message || null,
    crearSiniestro: crearMutation.mutate,
    deleteSiniestro: deleteMutation.mutate,
    updateSiniestros: updateMutation.mutate,
    assignAnalista: assignMutation.mutate,
    isCreating: crearMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isAssigning: assignMutation.isPending,
  };
};

export default useSiniestros;
