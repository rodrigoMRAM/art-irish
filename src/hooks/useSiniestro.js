import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const fetchSiniestros = async (token) => {
  const res = await fetch(`${API_URL}/siniestros`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Error al cargar los siniestros');
  return res.json();
};

// Crear siniestro
const crearSiniestro = async ({ formData, token }) => {
  const res = await fetch(`${API_URL}/siniestros`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error('Error al crear el siniestro');
  return res.json();
};

// Eliminar siniestro
const deleteSiniestro = async ({ idStro, token }) => {
  console.log(idStro)
  const res = await fetch(`${API_URL}/siniestros/${idStro}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Error al eliminar el siniestro');
  return idStro;
};

// Editar siniestro
const updateSiniestro = async ({ idStro, updatedData, token }) => {
  const res = await fetch(`${API_URL}/siniestros/${idStro}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error('Error al editar el siniestro');
  return res.json();
};

// Asignar analista
const assignAnalista = async ({ idStro, analistaId, token }) => {
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
};

// Hook para obtener siniestros
export const useSiniestros = () => {
  const token = useSelector((state) => state.user.jwt);
  return useQuery({
    queryKey: ['siniestros'],
    queryFn: () => fetchSiniestros(token),
  });
};

// Hook para crear siniestro
export const useCrearSiniestro = () => {
  const token = useSelector((state) => state.user.jwt);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ formData }) => crearSiniestro({ formData, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(['siniestros']);
    },
  });
};

// Hook para eliminar siniestro
export const useDeleteSiniestro = () => {
  const token = useSelector((state) => state.user.jwt);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ idStro }) => deleteSiniestro({ idStro, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(['siniestros']);
    },
  });
};

// Hook para actualizar siniestro
export const useUpdateSiniestro = () => {
  const token = useSelector((state) => state.user.jwt);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ idStro, updatedData }) =>
      updateSiniestro({ idStro, updatedData, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(['siniestros']);
    },
  });
};

// Hook para asignar analista
export const useAssignAnalista = () => {
  const token = useSelector((state) => state.user.jwt);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ idStro, analistaId }) =>
      assignAnalista({ idStro, analistaId, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(['siniestros']);
    },
  });
};
