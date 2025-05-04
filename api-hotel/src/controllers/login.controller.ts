import { Request, response, Response } from "express";
import jwt from 'jsonwebtoken';
import {encodeToken} from '../configs/TokenMiddleware'
import {MessageResponse} from '../entities/dto/GeneralDto';
import AuthService from '../services/Auth.service';
import { TypeKeyParamEnum} from '../configs/Config.enum';
import { validateParams } from "../configs/General.functions";

class LoginController {
    public async login (req: Request, res:Response){
        const {usuario, password} = req.body;
        let result = validateParams(usuario,TypeKeyParamEnum.USER)
        if(result.success){
            result = await AuthService.auth(usuario,password);
            console.log("result",result)
            if(result.success){
                res =  encodeToken(res, usuario, result.data?.NOMBRE, result.data?.ROL,result.data?.ROL_ID, result.data?.SUCURSALES,result.data?.SUCURSAL_PRINCIPAL, parseInt(result.data?.id));
                result.data.token = res.getHeader('Authorization');
            }
        }
        return res.status(200).send(result);
    }

    public async verifyEmail (req: Request, res:Response){
        const {email} = req.body;
        // let result = validateParams(email,TypeKeyParamEnum.USER)
        // if(result.success){
            let result = await AuthService.verifyEmail(email);
        // }
        return res.status(200).send(result);
    }

    public logout (req: Request, res:Response){
        res.send('Hola Logout')
    }
}
export default new LoginController();