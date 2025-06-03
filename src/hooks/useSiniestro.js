import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const fetchSiniestros = async (
  token,
  { artId, analistaId, tipoStro, tipoInvestigacion, resultado } = {}
) => {
  // Construimos el query string con sólo los parámetros que no sean null/undefined/""
  const queryParams = new URLSearchParams();
  if (artId != null && artId !== "") {
    queryParams.set("artId", artId);
  }
  if (analistaId != null && analistaId !== "") {
    queryParams.set("analistaId", analistaId);
  }
  if (tipoStro != null && tipoStro !== "") {
    queryParams.set("tipoStro", tipoStro);
  }
  if (tipoInvestigacion != null && tipoInvestigacion !== "") {
    queryParams.set("tipoInvestigacion", tipoInvestigacion);
  }
  if (resultado != null && resultado !== "") {
    queryParams.set("resultado", resultado);
  }

  // Si hay algún parámetro, lo anexamos a la URL
  const url =
    queryParams.toString().length > 0
      ? `${API_URL}/siniestros?${queryParams.toString()}`
      : `${API_URL}/siniestros`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Error al cargar los siniestros");
  return res.json();
};

// Crear siniestro
const crearSiniestro = async ({ formData, token }) => {
  const res = await fetch(`${API_URL}/siniestros`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error("Error al crear el siniestro");
  return res.json();
};

// Eliminar siniestro
const deleteSiniestro = async ({ idStro, token }) => {
  console.log(idStro);
  const res = await fetch(`${API_URL}/siniestros/${idStro}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Error al eliminar el siniestro");
  return idStro;
};

// Editar siniestro
const updateSiniestro = async ({ idStro, updatedData, token }) => {
  const res = await fetch(`${API_URL}/siniestros/${idStro}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error("Error al editar el siniestro");
  return res.json();
};

// Asignar analista
const assignAnalista = async ({ idStro, analistaId, token }) => {
  const res = await fetch(`${API_URL}/siniestros/${idStro}/analista`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ analistaId }),
  });
  if (!res.ok) throw new Error("No se pudo asignar analista");
  return { idStro, analistaId };
};

export const useSiniestros = ({
  artId,
  analistaId,
  tipoStro,
  tipoInvestigacion,
  resultado,
} = {}) => {
  const token = useSelector((state) => state.user.jwt);

  return useQuery({
    // Incluimos los filtros en la queryKey para que React Query sepa cuándo refetchear
    queryKey: ["siniestros", { artId, analistaId, tipoStro, tipoInvestigacion, resultado }],
    queryFn: () =>
      fetchSiniestros(token, { artId, analistaId, tipoStro, tipoInvestigacion, resultado }),
    // Opcional: si quieres refrescar al reintentar etc.
    staleTime: 1000 * 60 * 2, // 2 minutos (ajusta a tu gusto)
  });
};

export const useCrearSiniestro = () => {
  const token = useSelector((state) => state.user.jwt);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ formData }) => {
      try {
        return await crearSiniestro({ formData, token });
      } catch (error) {
        console.error("Error en crearSiniestro:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["siniestros"]);
    },
    onError: (error) => {
      console.error("Falló la creación del siniestro:", error);
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
      queryClient.invalidateQueries(["siniestros"]);
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
      queryClient.invalidateQueries(["siniestros"]);
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
      queryClient.invalidateQueries(["siniestros"]);
    },
  });
};
