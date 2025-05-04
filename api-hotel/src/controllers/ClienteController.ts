import { Request, Response } from 'express';
import { ClienteService } from '../services/ClienteService';
import { ClienteDto, ClienteRegex } from '../entities/dto/ClienteDto';
import { MessageResponse } from '../entities/dto/GeneralDto';
import { getAuthUser } from '../configs/TokenMiddleware';

const clienteService = new ClienteService();

function validate(dataForm: ClienteDto): { success: boolean; message: string } {
    let res = { success: false, message: 'Error de validación del(los) campo(s): ' };
    try {
        let campoError: string[] = [];
        Object.keys(ClienteRegex).forEach((key: string) => {
            const value = dataForm[key as keyof ClienteDto];
            const regexValue = ClienteRegex[key as keyof ClienteDto] as string;
            let regex = new RegExp(regexValue);
            if (value && !regex.test(value.toString())) {
                campoError.push(key);
            }
        });
        res.success = campoError.length === 0;
        res.message = campoError.length > 0 ? res.message + campoError.join(', ') : 'Sin error';
    } catch (error) {
        console.error(error);
    }
    return res;
}

export class ClienteController {
    public async create(req: Request, res: Response) {
        const clienteDto = req.body as ClienteDto;
        const validation = validate(clienteDto);
        if (!validation.success) {
            const response: MessageResponse = {
                success: false,
                message: validation.message,
                code: 400
            };
            return res.status(400).json(response);
        }
        const cliente = await clienteService.create(clienteDto);
        const response: MessageResponse = {
            success: true,
            message: 'Cliente creado exitosamente',
            code: 201,
            data: cliente
        };
        return res.status(201).json(response);
    }

    public async findAll(req: Request, res: Response) {
        const take = parseInt(req.query.limit as string) || 10;
        const skip = (parseInt(req.query.page as string) ) * take || 0;
        const [result, total] = await clienteService.findAll(take, skip);
        const response: MessageResponse = {
            success: true,
            message: 'Clientes obtenidos exitosamente',
            code: 200,
            data: result,
            total
        };
        return res.status(200).json(response);
    }

    public async findOne(req: Request, res: Response) {
        const cliente = await clienteService.findOne(Number(req.params.id));
        if (!cliente) {
            const response: MessageResponse = {
                success: false,
                message: 'Cliente no encontrado',
                code: 404
            };
            return res.status(404).json(response);
        }
        const response: MessageResponse = {
            success: true,
            message: 'Cliente encontrado',
            code: 200,
            data: cliente
        };
        return res.status(200).json(response);
    }

    public async update(req: Request, res: Response) {
        const clienteDto = req.body as ClienteDto;
        const validation = validate(clienteDto);
        if (!validation.success) {
            const response: MessageResponse = {
                success: false,
                message: validation.message,
                code: 400
            };
            return res.status(400).json(response);
        }
        const cliente = await clienteService.update(Number(req.params.id), clienteDto);
        if (!cliente) {
            const response: MessageResponse = {
                success: false,
                message: 'Cliente no encontrado',
                code: 404
            };
            return res.status(404).json(response);
        }
        const response: MessageResponse = {
            success: true,
            message: 'Cliente actualizado exitosamente',
            code: 200,
            data: cliente
        };
        return res.status(200).json(response);
    }

    public async delete(req: Request, res: Response) {
        const deleted = await clienteService.delete(Number(req.params.id));
        if (!deleted) {
            const response: MessageResponse = {
                success: false,
                message: 'Cliente no encontrado',
                code: 404
            };
            return res.status(404).json(response);
        }
        const response: MessageResponse = {
            success: true,
            message: 'Cliente eliminado exitosamente',
            code: 204
        };
        return res.status(204).json(response);
    }
}
