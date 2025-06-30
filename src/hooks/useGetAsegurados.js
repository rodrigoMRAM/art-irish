// src/hooks/useGetAsegurados.js
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

const API_URL = import.meta.env.VITE_API_BASE_URL

// --- Fetchers ---
const fetchAsegurados = async (token) => {
  const res = await fetch(`${API_URL}/asegurados`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Error al cargar asegurados')
  }
  return res.json()
}

const fetchContactos = async (token) => {
  const res = await fetch(`${API_URL}/contactos`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Error al cargar contactos')
  }
  return res.json()
}

// --- Hooks ---
export const useGetAsegurados = () => {
  const token = useSelector(state => state.user.jwt)

  return useQuery({
    queryKey: ['asegurados'],
    queryFn: () => fetchAsegurados(token),
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: false,
  })
}

export const useGetContactos = () => {
  const token = useSelector(state => state.user.jwt)

  return useQuery({
    queryKey: ['contactosAsegurado'],
    queryFn: () => fetchContactos(token),
    staleTime: 1000 * 60 * 5,
    retry: false,
  })
}
