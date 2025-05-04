// "use client";

import { useState } from "react";

interface RegisterPageProps {
  onRegisterSuccess: () => void; // Función para cerrar el modal
}

export default function RegisterPage({ onRegisterSuccess }: RegisterPageProps) {
  const [usuario, setUsuario] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("CLIENTE");
  const [message, setMessage] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, nombre, password, rol}),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Usuario registrado exitosamente");

        // Llamar a onRegisterSuccess para cerrar el modal
        onRegisterSuccess(); // Cerrar el modal

      } else {
        setMessage(data.message || "Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Ocurrió un error inesperado.");
      setRol("CLIENTE");
    }
  }

  return (
    <div>
      <h1>Registrar Usuario</h1>
      <form onSubmit={handleRegister}>
        <br/>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <br/>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <br/>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br/>
        <button type="submit">Registrar</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
