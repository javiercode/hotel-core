"use client";

import { useState, useEffect } from "react";
import { useSession } from "./session/SessionContext";
import Home from "./busqueda/home";
import Image from "next/image";
//import "./carousel.css"; // Archivo CSS externo
import "./home/carousel.css"; // ajusta según la ubicación real

const images = [
  '/img/banner-1.jpg',
  '/img/banner-2.jpg',
  '/img/banner-3.jpg'
];

export default function HomePage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 50000); // 4 segundos
    return () => clearInterval(interval);
  }, []);

  const prevImage = () => setIndex((index - 1 + images.length) % images.length);
  const nextImage = () => {
    console.log("index",index)
    setIndex((index + 1) % images.length)};

  return (
    <>
      {/* Carrusel con controles */}
      <div className="carousel-container">
      

        {images.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`Imagen ${i + 1}`}
            fill
            className={`carousel-image ${i === index ? 'visible' : 'hidden'}`}
          />
        ))}
        <button onClick={prevImage} className="carousel-button left">❮</button>
        <button onClick={nextImage} className="carousel-button right">❯</button>
      </div>

      {/* Sección Home centrada */}
      {/* <div className="flex items-center justify-center h-[400px]"> */}
      <div className="overlay-content">
        {/* <h2 >UTAMA hotel</h2> */}
        <Home />
      </div>

      {/* Sección Sobre Nosotros */}
      <hr/>
      <section id="sobre-nosotros" className="mt-24 text-center px-6 py-16 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-md">
        <h2 className="text-4xl font-extrabold text-blue-800 mb-6">Sobre Nosotros</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Bienvenido al Hotel Example, su destino ideal para relajarse y disfrutar de una experiencia inolvidable...
        </p>
      </section>

      {/* Sección Contáctanos */}
      <hr/>
      <section id="contacto" className="mt-24 text-center px-6 py-16 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl shadow-md">
        <h2 className="text-4xl font-extrabold text-blue-800 mb-6">Contáctanos</h2>
        <p className="text-lg text-gray-700 mb-4">📞 Teléfono: +591 70000000</p>
        <p className="text-lg text-gray-700 mb-4">✉️ Correo: contacto@hotelexample.com</p>
        <p className="text-lg text-gray-700">📍 Dirección: Calle Principal #123, Ciudad, País</p>
      </section>
    </>
  );
}
