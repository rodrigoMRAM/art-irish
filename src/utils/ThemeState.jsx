import React, { createContext, useState, useContext, useEffect } from 'react';

// Crear el contexto
const ThemeContext = createContext();

// Proveedor de contexto que maneja el tema
export const ThemeProvider = ({ children }) => {
  // Estado para manejar el tema
  const [theme, setTheme] = useState(() => {
    // Intentar obtener el tema desde el localStorage
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
  });

  // Función para alternar el tema
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme); // Guardar la preferencia en el localStorage
      return newTheme;
    });
  };

  useEffect(() => {
    // Aplicar el tema en el body para cambiar el estilo global
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para acceder al contexto desde cualquier componente
export const useTheme = () => useContext(ThemeContext);
