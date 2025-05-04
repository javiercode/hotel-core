// "use client";

import { useState } from "react";

interface LoginPageProps {
  onLoginSuccess: (user: string, role: string, token: string) => void; // Agregar el token
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Inicio de sesión exitoso");

        // Pasar el usuario, rol y token a la función onLoginSuccess
        onLoginSuccess(data.data.usuario, data.data.rol, data.data.token);

      } else {
        setMessage(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Ocurrió un error inesperado.");
    }
  }

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
        <br/>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <br/>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br/>
        <button type="submit">Ingresar</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
