export interface HabitacionDto {
  numero: string;
  tipo: string;
  precio: number;
  nroCama: number;
  imagenes?: string[] ;
}

export const HabitacionRegex = {
  numero: "^[a-zA-Z0-9]{1,10}$",
  tipo: "^[a-zA-Z0-9 ]{1,50}$",
  precio: "^[0-9]+(\\.[0-9]{1,2})?$",
  nroCama: "^[0-9]+(\\.[0-9]{1,2})?$",
  imagenes: "^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$"
};