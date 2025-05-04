import { Cliente } from "../Cliente";
import { Habitacion } from "../Habitacion";
import { User } from "../User";

export interface ReservaDto {
  fechaInicio: string;
  fechaFin: string;
  estado: string;
  idHabitacion:number;
}

export const ReservaRegex = {
  fechaInicio: "^(\\d{4}-\\d{2}-\\d{2})$",
  fechaFin: "^(\\d{4}-\\d{2}-\\d{2})$",
  estado: "^(PENDIENTE|CONFIRMADO|CANCELADO|PAGADO|CHECK_IN|CHECK_OUT)$",
  idHabitacion:  "^[0-9.]{1,10}$",
  idCliente: "^[0-9.]{1,10}$"
};
