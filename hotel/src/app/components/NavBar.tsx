"use client";

import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import RegisterPage from "../session/register";
import LoginPage from "../session/login";
import Link from "next/link";
import { useSession } from "../session/SessionContext";

export default function Navbar() {
  const { isAuthenticated, usuario, rol, logout, login } = useSession(); // Usar el contexto
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Sincronizar el estado con localStorage
  useEffect(() => {
    const storedUsuario = localStorage.getItem("usuario");
    const storedRol = localStorage.getItem("rol");
    const storedToken = localStorage.getItem("token");

    if (storedUsuario && storedRol && storedToken) {
      login(storedUsuario, storedRol, storedToken);
    }
  }, [login]);

  return (
    <header className="navbar">
      <div className="menu-left">
        <Link href="/">Inicio</Link>
        <Link href="#sobre-nosotros">Sobre Nosotros</Link>
        <Link href="#contacto">Contactanos</Link>        
        <span style={{paddingLeft:"20dvi",fontFamily:"Arial, sans-serif",fontWeight:"bolder", fontSize:"30px"}}> UTAMA HOTEL</span>        
        {isAuthenticated && rol === "ADM" && <Link href="/habitacion">Habitaciones</Link>}
      </div>
      <div className="menu-right">
        {isAuthenticated ? (
          <>
            <span className="welcome-message">Bienvenido {usuario}</span>
            <button className="btn-secondary" onClick={logout}>
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <button className="btn-primary" onClick={() => setShowLoginModal(true)}>
              Iniciar Sesión
            </button>
            <button className="btn-secondary" onClick={() => setShowRegisterModal(true)}>
              Registrar
            </button>
          </>
        )}
      </div>

      {/* Modales */}
      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <LoginPage
          onLoginSuccess={(user, role, token) => {
            login(user, role, token); // Actualizar el contexto
            setShowLoginModal(false);
          }}
        />
      </Modal>
      <Modal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)}>
        <RegisterPage onRegisterSuccess={() => setShowRegisterModal(false)} />
      </Modal>
    </header>
  );
}
