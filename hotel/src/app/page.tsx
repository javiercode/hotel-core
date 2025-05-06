"use client";

import { useState, useEffect } from "react";
import { useSession } from "./session/SessionContext";
import Home from "./busqueda/home";
import Image from "next/image";

const images = [
  '/img/bannerl.jpg',
  '/img/banner2.jpg',
  '/img/banner3.jpg'
];

export default function HomePage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 500);
    return () => clearInterval(interval);
  }, []);


  return (
    <>
    {/* Carrusel de imágenes */}
    <div className="w-full h-72 relative mb-12 overflow-hidden rounded-xl shadow-lg">
        {images.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`Imagen ${i + 1}`}
            fill
            className={`transition-opacity duration-1000 object-cover ${i === index ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      {/* Tabs de búsqueda y check-in */}
      <Home/>

      {/* Sección Sobre Nosotros */}
      <section className="mt-24 text-center px-6 py-16 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-md">
        <h2 className="text-4xl font-extrabold text-blue-800 mb-6">Sobre Nosotros</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Bienvenido al Hotel Example, su destino ideal para relajarse y disfrutar de una experiencia inolvidable. Nuestro hotel combina comodidad, elegancia y un servicio excepcional para asegurar que su estadía sea perfecta. Ubicados en el corazón de la ciudad, ofrecemos habitaciones de lujo, gastronomía de clase mundial y actividades recreativas para toda la familia.
        </p>
      </section>

      {/* Sección Contáctanos */}
      <section className="mt-24 text-center px-6 py-16 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl shadow-md">
        <h2 className="text-4xl font-extrabold text-blue-800 mb-6">Contáctanos</h2>
        <p className="text-lg text-gray-700 mb-4">📞 Teléfono: +591 70000000</p>
        <p className="text-lg text-gray-700 mb-4">✉️ Correo: contacto@hotelexample.com</p>
        <p className="text-lg text-gray-700">📍 Dirección: Calle Principal #123, Ciudad, País</p>
      </section>
    </>
  );
}
