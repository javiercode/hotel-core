import {MessageResponse} from '../../entities/dto/GeneralDto';

export interface IUser {
    enviarCorreo: (email: string) => Promise<any>;
    list: (limit: number, page: number) => Promise<any>;
    create: (userDto: any) => Promise<any>;
    edit: (id:number,userDto: any)=> Promise<MessageResponse>;
    desactivar: (id:number)=> Promise<MessageResponse>;
    getUsuario: (usuario: string)=> Promise<string>;
}