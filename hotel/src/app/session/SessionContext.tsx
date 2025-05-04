"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SessionContextType = {
  isAuthenticated: boolean;
  token: string | null;
  usuario: string;
  rol: string;
  login: (user: string, role: string, token: string) => void;
  logout: () => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<string>("");
  const [rol, setRol] = useState<string>("");
  const isAuthenticated = !!token;

  // Función para manejar el inicio de sesión
  const login = (user: string, role: string, token: string) => {
    setToken(token);
    setUsuario(user);
    setRol(role);

    // Guardar datos en localStorage para persistencia
    localStorage.setItem("usuario", user);
    localStorage.setItem("rol", role);
    localStorage.setItem("token", token);
  };

  // Función para manejar el cierre de sesión
  const logout = () => {
    setToken(null);
    setUsuario("");
    setRol("");

    // Eliminar datos del localStorage
    localStorage.removeItem("usuario");
    localStorage.removeItem("rol");
    localStorage.removeItem("token");
  };

  return (
    <SessionContext.Provider
      value={{
        isAuthenticated,
        token,
        usuario,
        rol,
        login,
        logout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession debe usarse dentro de un SessionProvider");
  }
  return context;
}