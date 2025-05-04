
export interface UserDto {
    usuario:string,
    nombre:string,
    password:string,
    rol:string,
    type?:'dto'
}

export interface UserEditPassDto {
    password:string,
    fechaModificacion?:Date,
}

export interface UserLoginDto {
    usuario:string,
    rol:string,
    id:string,
    estado?:boolean,
    fechaRegistro?:Date,
    personaId?:number
}

export interface UserVerifyDto {
    usuario:string,
    type?:'dto'
}

export const UserRegex: UserDto = {
    usuario:"^[a-zA-Z0-9]{3,30}$",
    nombre:"^[a-zA-Z0-9]{3,200}$",
    rol:"^[A-Z]{3,200}$",
    password:"^[a-zA-ZÀ-ÿ ]{3,30}$"
    // estado:"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$",
    // fechaRegistro:"^[\\w\\W\\d\\D\\t\\n]{6,30}$",
    // codFacebook:"^[\\w\\W\\d\\D\\t\\n]{0,30}$",
};