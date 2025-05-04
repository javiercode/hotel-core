import { Request, response, Response } from "express";
import { getAuthUser } from '../configs/TokenMiddleware';
import ServiciosService from '../services/Servicio.service';
import { MessageResponse } from "../entities/dto/GeneralDto";
import { TypeKeyParamEnum } from "../configs/Config.enum";
import { validateParams } from "../configs/General.functions";
import { GrupoRegex, ServicioDto } from "../entities/dto/ServicioDto";

class ServicioController {

    public async test(req: Request, res: Response) {
        const { page, limit } = req.params;
        const result = await ServiciosService.test(getAuthUser(req));
        return res.status(200).send(result);
    }

    public async list(req: Request, res: Response) {
        const { page, limit } = req.params;
        let result;
        result = await ServiciosService.listAll();
        return res.status(200).send(result);
    }

    public async create(req: Request, res: Response) {
        const dto = req.body as ServicioDto;
        let result = validate(dto);
        if(result.success){
            result = await ServiciosService.create(dto, getAuthUser(req));
        }
        return res.status(200).send(result);
    }

    public async edit(req: Request, res: Response) {
        const userDto = req.body as ServicioDto;
        let result = validateParams(req.params.id,TypeKeyParamEnum.PK_ORACLE)
        
        if(result.success){
            result = await ServiciosService.edit(Number(req.params.id), userDto, getAuthUser(req));
        }
        return res.status(200).send(result);
    }

    public async delete(req: Request, res: Response) {
        let result = validateParams(req.params.id,TypeKeyParamEnum.PK_ORACLE)
        if(result.success){
            result = await ServiciosService.desactivar( Number(req.params.id), getAuthUser(req));
        }
        return res.status(200).send(result);
    }
}

function validate(dataForm: ServicioDto): MessageResponse {
    let res: MessageResponse = { success: false, message: "Error de validación del(los) campo(s): ", code: 0 };
    try {
        let campoError = [] as string[];
        Object.keys(GrupoRegex).forEach((key:string) => {
            const value = dataForm[key as keyof ServicioDto];
            const regexValue = GrupoRegex[key as keyof ServicioDto] as string;
            let regex = new RegExp(regexValue);
            if (value && !regex.test(value.toString())) {
                campoError.push(key);
            }
        });
        res.success = campoError.length==0;
        res.message = campoError.length > 0? (res.message + campoError.join(", ")):"Sin error";    
    } catch (error) {
        console.error(error)
    }
    
    return res;
}
export default new ServicioController();