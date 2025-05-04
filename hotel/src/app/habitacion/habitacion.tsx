// "use client";

import { useState, useEffect } from "react";
import Modal from "../components/Modal"; // Asegúrate de que este modal esté correctamente implementado

interface Habitacion {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

export default function Habitaciones() {
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentHabitacion, setCurrentHabitacion] = useState<Habitacion | null>(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState<number>(0);

  // Obtener las habitaciones desde la API
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/hotel/api/v1/habitacion/list`)
      .then((res) => res.json())
      .then((data) => setHabitaciones(data))
      .catch((error) => console.error("Error fetching habitaciones:", error));
  }, []);

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const habitacionData = { nombre, descripcion, precio };
    if (isEditing && currentHabitacion) {
      // Actualizar habitación
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hotel/api/v1/habitacion/${currentHabitacion.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(habitacionData),
      });
    } else {
      // Crear nueva habitación
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hotel/api/v1/habitacion/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(habitacionData),
      });
    }
    // Actualizar lista de habitaciones
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/hotel/api/v1/habitacion/list`)
      .then((res) => res.json())
      .then((data) => setHabitaciones(data))
      .catch((error) => console.error("Error fetching habitaciones:", error));
    
    // Cerrar modal
    setShowModal(false);
    resetForm();
  };

  const handleDelete = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hotel/api/v1/habitacion/${id}`, {
      method: "DELETE",
    });
    // Actualizar lista después de eliminar
    setHabitaciones(habitaciones.filter((habitacion) => habitacion.id !== id));
  };

  const handleEdit = (habitacion: Habitacion) => {
    setCurrentHabitacion(habitacion);
    setNombre(habitacion.nombre);
    setDescripcion(habitacion.descripcion);
    setPrecio(habitacion.precio);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleCreate = () => {
    resetForm();
    setIsEditing(false);
    setShowModal(true);
  };

  const resetForm = () => {
    setNombre("");
    setDescripcion("");
    setPrecio(0);
    setCurrentHabitacion(null);
  };

  return (
    <div>
      <h1>Habitaciones</h1>
      <button className="btn-primary" onClick={handleCreate}>
        Crear Habitacion
      </button>
      <ul>
        {habitaciones.map((habitacion) => (
          <li key={habitacion.id}>
            <strong>{habitacion.nombre}</strong> - {habitacion.descripcion} - ${habitacion.precio}
            <button onClick={() => handleEdit(habitacion)}>Editar</button>
            <button onClick={() => handleDelete(habitacion.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      {/* Modal para Crear/Editar Habitacion */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2>{isEditing ? "Editar Habitacion" : "Crear Habitacion"}</h2>
        <form onSubmit={handleCreateOrUpdate}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <input
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(Number(e.target.value))}
          />
          <button type="submit">{isEditing ? "Actualizar" : "Crear"}</button>
        </form>
      </Modal>
    </div>
  );
}
