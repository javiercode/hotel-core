export interface ClienteDto {
  nombre: string;
  email: string;
  telefono?: string;
}

export const ClienteRegex = {
  nombre: "^[a-zA-Z0-9 ]{3,200}$",
  email: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
  telefono: "^[0-9]{0,20}$"
};