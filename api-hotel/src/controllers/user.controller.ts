import { Request, response, Response } from "express";
import UserService from '../services/User.service';
// import { UserConfirmDto, UserDto, UserEditDto, UserRegex, UserVerifyDto } from '../entities/dto/UserDto';
import {  UserDto, UserRegex, UserVerifyDto} from '../entities/dto/UserDto';
import { getFecha, validateParams } from "../configs/General.functions";
import { TypeKeyParamEnum } from "../configs/Config.enum";
import { MessageResponse } from "../entities/dto/GeneralDto";
import { getAuthUser } from "../configs/TokenMiddleware";


class UserController {

    async test(req: Request, res: Response): Promise<Response> {
        return res.status(501)
    }

    async list(req: Request, res: Response): Promise<Response> {
        const { page, limit } = req.params;
        const resultPage = validateParams(page, TypeKeyParamEnum.PAGE)
        const resultLimit = validateParams(limit, TypeKeyParamEnum.LIMIT)
        let result;
        if (resultLimit.success && resultPage.success) {
            result = await UserService.list(parseInt(limit), parseInt(page));
        } else {
            result = resultLimit.success ? resultPage : resultLimit;
        }
        return res.status(200).send(result);
    }

    async create(req: Request, res: Response): Promise<Response> {
        const userDto = req.body as UserDto;
        let result = validate(toIFormValidateCreate(userDto));
        if (result.success) {
            result = await UserService.create(userDto);
        }
        return res.status(201).send(result);
    }
    async verificar(req: Request, res: Response): Promise<Response> {
        const verifyUser = req.body as UserVerifyDto;
        let result = validateParams(verifyUser.usuario, TypeKeyParamEnum.EMAIL);
        if (result.success) {
            // result = await UserService.enviarCorreo(verifyUser.usuario);
        }
        return res.status(200).send(result);
    }
    
    async edit(req: Request, res: Response): Promise<Response> {
        delete req.body.password;
        const userDto = req.body as UserDto;
        let result = validate(toIFormValidateCreate(userDto));
        if (result.success) {
            result = await UserService.edit(Number.parseInt(req.params.id),userDto);
        }
        return res.status(200).send(result);
    }

    public async desactivar(req: Request, res: Response): Promise<Response> {
        let result = validateParams(req.params.id, TypeKeyParamEnum.OBJECT_ID)
        if (result.success) {
            result = await UserService.desactivar(Number.parseInt(req.params.id));
        }
        return res.status(200).send(result);
    }

    public async updateFoto(req: Request, res: Response): Promise<Response> {
        const fotoB64 = req.body.data as string;
        let result = validateParams(req.params.username, TypeKeyParamEnum.PARAM_BUSQUEDA)
        if (result.success) {
            result = await UserService.updateFoto((req.params.username),fotoB64,getAuthUser(req));
        }
        return res.status(200).send(result);
    }
    public async obtenerFoto(req: Request, res: Response): Promise<Response> {
        let result = validateParams(req.params.username, TypeKeyParamEnum.PARAM_BUSQUEDA)
        if (result.success) {
            result = await UserService.obtenerFoto(req.params.username);
        }
        return res.status(200).send(result);
    }
}

function validate(dataForm: UserDto ): MessageResponse {
    let res: MessageResponse = { success: false, message: "Error de validación del(los) campo(s): ", code: 0 };
    try {
        let campoError = [] as string[];
        Object.keys(dataForm).forEach((key: string) => {
            let value;
            if(dataForm?.type && dataForm.type =='dto'){
                value = dataForm[key as keyof UserDto];
            }
            const regexValue = UserRegex[key as keyof UserDto] as any;
            let regex = new RegExp(regexValue);
            if (value && !regex.test(value.toString())) {
                campoError.push(key);
            }
        });
        res.success = campoError.length == 0;
        res.message = campoError.length > 0 ? (res.message + campoError.join(", ")) : "Sin error";
    } catch (error) {
        console.error(error)
    }

    return res;
}

function toIFormValidateCreate(dataForm: UserDto): UserDto {
    let res;
    if(dataForm.type=='dto'){
        res = {
            usuario: dataForm.usuario,
            password: dataForm.password,
            nombre:dataForm.nombre,
            rol:dataForm.rol
        };
    }else{
        res = {
            usuario: dataForm.usuario,
            password: dataForm.password,
            nombre:dataForm.nombre,
            rol:dataForm.rol
        };
    }
    return res;
}

export default new UserController();