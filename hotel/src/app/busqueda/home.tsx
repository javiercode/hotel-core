"use client";

import { useState, useEffect } from "react";
import { useSession } from "../session/SessionContext";


type Habitacion = {
  id: number;
  numero: number;
  precio: number;
  numeroCamas: number;
  tipo: string; // simple, doble, matrimonial
};

type Cliente = {
  id: number;
  nombre: string;
  usuario: string;
};

type Reserva = {
  id: number;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
  habitacion: Habitacion;
  cliente: Cliente;
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"habitaciones" | "reservas">("habitaciones");
  const { token } = useSession(); // Usar el contexto
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedHabitacion, setSelectedHabitacion] = useState<Habitacion | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    fechaInicio: "",
    fechaFinal: "",
    tipo: "",
    numeroCamas: "",
  });

  useEffect(() => {
    if (activeTab === "habitaciones") handleSearchHabitaciones();
    if (activeTab === "reservas" && token) handleFetchReservas();
  }, [activeTab, token]);

  async function handleSearchHabitaciones() {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        fechaInicio: filters.fechaInicio || "",
        fechaFinal: filters.fechaFinal || "",
        tipo: filters.tipo || "",
        numeroCamas: filters.numeroCamas || "",
      }).toString();

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/habitacion/list?${params}`);
      const data = await response.json();
      setHabitaciones(data.data || []);
    } catch (error) {
      console.error("Error al buscar habitaciones:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleFetchReservas() {
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reservas`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setReservas(data.data || []);
    } catch (error) {
      console.error("Error al obtener reservas:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleOpenReservaModal(habitacion: Habitacion) {
    setSelectedHabitacion(habitacion);
    setModalOpen(true);
  }

  async function handleCreateReserva(event: React.FormEvent) {
    event.preventDefault();
    if (!token) return alert("Debe iniciar sesión para realizar una reserva");

    const formData = new FormData(event.target as HTMLFormElement);
    const reserva = {
      fechaInicio: formData.get("fechaInicio") as string,
      fechaFin: formData.get("fechaFin") as string,
      estado: "PENDIENTE",
      idHabitacion: selectedHabitacion?.id
    };

    try {
      if(!token){
        alert("Debe iniciar sesion");
      }else{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reservas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reserva),
      });

      if (response.ok) {
        console.log("response",response);
        alert("Reserva creada exitosamente");
        setModalOpen(false);
        handleFetchReservas(); // Refrescar el listado de reservas
      } else {
        alert("Error al crear la reserva");
      }
      }
      
    } catch (error) {
      console.error("Error al crear la reserva:", error);
    }
  }

  // function handleLoginSuccess(user: string, role: string, token: string) {
  //   // alert(`Bienvenido ${user} (${role})`);
  // }

  return (
    <div>
      {/* TABS */}
      <div className="tabs">
        <button
          className={activeTab === "habitaciones" ? "active" : ""}
          onClick={() => setActiveTab("habitaciones")}
        >
          Habitaciones
        </button>
        <button
          className={activeTab === "reservas" ? "active" : ""}
          onClick={() => setActiveTab("reservas")}
        >
          Reservas
        </button>
      </div>

      {/* CONTENIDO DE LAS PESTAÑAS */}
      <div className="tab-content">
        {activeTab === "habitaciones" && (
          <section className="habitaciones">
            <div className="filters">
              <h3>Filtros</h3>
              <input
                type="date"
                placeholder="Fecha Inicio"
                value={filters.fechaInicio}
                onChange={(e) => setFilters({ ...filters, fechaInicio: e.target.value })}
              />
              <input
                type="date"
                placeholder="Fecha Fin"
                value={filters.fechaFinal}
                onChange={(e) => setFilters({ ...filters, fechaFinal: e.target.value })}
              />
              <select
                value={filters.tipo}
                onChange={(e) => setFilters({ ...filters, tipo: e.target.value })}
              >
                <option value="">Tipo de Habitación</option>
                <option value="simple">Simple</option>
                <option value="doble">Doble</option>
                <option value="matrimonial">Matrimonial</option>
              </select>
              <input
                type="number"
                placeholder="Número de Camas"
                value={filters.numeroCamas}
                onChange={(e) => setFilters({ ...filters, numeroCamas: e.target.value })}
              />
              <button onClick={handleSearchHabitaciones}>Buscar</button>
            </div>

            {loading ? (
              <p>Cargando...</p>
            ) : (
              <div className="room-cards">
                {habitaciones.map((habitacion) => (
                  <div key={habitacion.id} className="room-card">                    
                    <img src={"/img/habitacion/image-"+habitacion.id+".jpg"} alt={""+habitacion.numero} />
                    <h3>{habitacion.numero}</h3>
                    <p>Tipo: {habitacion.tipo}</p>
                    <p>Camas: {habitacion.numeroCamas}</p>
                    <p className="price">Precio: ${habitacion.precio} / noche</p>
                    {token &&
                    <button onClick={() => handleOpenReservaModal(habitacion)}>
                      Hacer Reserva
                    </button>}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "reservas" && (
          <section className="reservas">
            {!token ? (
              <>
                <p>Debe iniciar sesión para ver sus reservas.</p>
                {/* <LoginPage onLoginSuccess={handleLoginSuccess} /> */}
              </>
              
            ) : loading ? (
              <p>Cargando...</p>
            ) : (
              <div className="room-cards">
                {reservas.map((reserva) => (
                  <div key={reserva.id} className="room-card">
                    <p>Habitación: {reserva.habitacion.numero}</p>
                    <p>Cliente: {reserva.cliente.nombre}</p>
                    <p>Fecha Inicio: {reserva.fechaInicio}</p>
                    <p>Fecha Fin: {reserva.fechaFin}</p>
                    <p>Estado: {reserva.estado}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>

      {/* MODAL PARA CREAR RESERVA */}
      {modalOpen && selectedHabitacion && (
        <div className="modal">
          <div className="modal-content">
            <h3>Hacer Reserva para: {selectedHabitacion.numero}</h3>
            <form onSubmit={handleCreateReserva}>
              <label>
                Fecha Inicio:
                <input type="date" name="fechaInicio" required />
              </label>
              <label>
                Fecha Fin:
                <input type="date" name="fechaFin" required />
              </label>
              <button type="submit">Confirmar Reserva</button>
              <button type="button" onClick={() => setModalOpen(false)}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* LOGIN PAGE (si no hay sesión) */}
      {/* {!token && <LoginPage onLoginSuccess={handleLoginSuccess} />} */}
    </div>
  );
}
