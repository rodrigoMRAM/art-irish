import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

const useListaUsuarios = () => {
  const token = useSelector((state) => state.user.jwt);
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const queryClient = useQueryClient();

  const fetchUsuarios = async () => {
    const response = await fetch(`${API_URL}/usuario/listar`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Error al cargar los usuarios');
    return response.json();
  };

  const {
    data: usuarios = [],
    isLoading: loading,
    isError,
    error,
  } = useQuery({
    queryKey: ['usuarios'],
    queryFn: fetchUsuarios,
  });

  const deleteUsuarioMutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`${API_URL}/usuario/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Error al eliminar el usuario');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['usuarios']);
    },
  });

  const editUsuarioMutation = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const response = await fetch(`${API_URL}/usuario/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error('Error al editar el usuario');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['usuarios']);
    },
  });

  return {
    usuarios,
    loading,
    error: isError ? error.message : null,
    deleteUsuario: deleteUsuarioMutation.mutate,
    editUsuario: (id, updatedData) => editUsuarioMutation.mutate({ id, updatedData }),
    isEditing: editUsuarioMutation.isPending,
    isDeleting: deleteUsuarioMutation.isPending,
    success: editUsuarioMutation.isSuccess,
  };
};

export default useListaUsuarios;
