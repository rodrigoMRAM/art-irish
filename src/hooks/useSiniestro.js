import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const fetchSiniestros = async (
  token,
  { numStro, artId, analistaId, tipoStro, tipoInvestigacion, resultado } = {}
) => {
  let url;

  if (numStro != null && numStro !== "") {
    // Buscar por número exacto
    url = `${API_URL}/siniestros/numero/${numStro}`;
  } else {
    // Construir query string con parámetros opcionales
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

    url =
      queryParams.toString().length > 0
        ? `${API_URL}/siniestros?${queryParams.toString()}`
        : `${API_URL}/siniestros`;
  }

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 404) {
    // Si busca por numStro y no existe, retornamos array vacío
    return [];
  }
  if (!res.ok) {
    throw new Error("Error al cargar los siniestros");
  }

  const data = await res.json();
  // Si vino un solo objeto (búsqueda por numStro), lo ponemos en array
  if (numStro != null && numStro !== "") {
    return [data];
  }
  return data;
};

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

const deleteSiniestro = async ({ idStro, token }) => {
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
  numStro,
  artId,
  analistaId,
  tipoStro,
  tipoInvestigacion,
  resultado,
} = {}) => {
  const token = useSelector((state) => state.user.jwt);

  return useQuery({
    queryKey: [
      "siniestros",
      { numStro, artId, analistaId, tipoStro, tipoInvestigacion, resultado },
    ],
    queryFn: () =>
      fetchSiniestros(token, {
        numStro,
        artId,
        analistaId,
        tipoStro,
        tipoInvestigacion,
        resultado,
      }),
    staleTime: 1000 * 60 * 2,
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
