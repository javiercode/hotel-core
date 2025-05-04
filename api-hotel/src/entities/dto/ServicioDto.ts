
export interface ServicioDto {
    nombre:string,
    descripcion:string,
    precio:number
}

export const GrupoRegex = {
    nombre: "^[a-zA-Z0-9_]{3,300}$",
    descripcion: "^[a-zA-Z0-9_ ]{3,300}$",
    precio: "^[0-9.]{1,10}$",
};