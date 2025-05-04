import {MessageResponse} from '../../entities/dto/GeneralDto';

export default interface IConvocatoria {
    test: (authSession:any) => Promise<any>;
    listAll: (estado:string, limit: number, page: number,authSession:any) => Promise<any>;
    //create: (dto: any,authSession:any) => Promise<any>;
    //edit: (id:string,dto: any,authSession:any)=> Promise<MessageResponse>;
}