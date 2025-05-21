import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
const API_URL = import.meta.env.VITE_API_BASE_URL;

const fetchAuditores = async () => {
    const token = useSelector((state) => state.user.jwt);

  const response = await fetch(`${API_URL}/auditores`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener auditores');
  }
  console.log(response)
  return response.json();
};

const useGetAuditores = () => {
  return useQuery({
    queryKey: ['auditores'],
    queryFn: fetchAuditores,
  });
};

export default useGetAuditores;
