import { Request, Response } from 'express';
import { ReservaService } from '../services/ReservaService';
import { ReservaDto, ReservaRegex } from '../entities/dto/ReservaDto';
import { Reserva } from '../entities/Reserva';
import { JwtPayload, MessageResponse } from '../entities/dto/GeneralDto';
import { getAuthUser } from '../configs/TokenMiddleware';

const reservaService = new ReservaService();

function validate(dataForm: ReservaDto): { success: boolean; message: string } {
    let res = { success: false, message: 'Error de validación del(los) campo(s): ' };
    try {
        let campoError: string[] = [];
        Object.keys(ReservaRegex).forEach((key: string) => {
            const value = dataForm[key as keyof ReservaDto];
            const regexValue = ReservaRegex[key as keyof ReservaDto] as string;
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

export class ReservaController {
    public async create(req: Request, res: Response) {
        const reservaDto = req.body as ReservaDto;
        const validation = validate(reservaDto);
        if (!validation.success) {
            const response: MessageResponse = {
                success: false,
                message: validation.message,
                code: 400
            };
            return res.status(400).json(response);
        }
        const payload:JwtPayload =getAuthUser(req);
        const reserva = await reservaService.create(reservaDto as Reserva,payload);
        const response: MessageResponse = {
            success: true,
            message: 'Reserva creada exitosamente',
            code: 201,
            data: reserva
        };
        return res.status(201).json(response);
    }

    public async findAll(req: Request, res: Response) {
        const take = parseInt(req.query.limit as string) || 10;
        const skip = (parseInt(req.query.page as string) ) * take || 0;
        const [result, total] = await reservaService.findAll(take, skip,getAuthUser(req));
        const response: MessageResponse = {
            success: true,
            message: 'Reservas obtenidas exitosamente',
            code: 200,
            data: result,
            total
        };
        return res.status(200).json(response);
    }

    public async findOne(req: Request, res: Response) {
        const reserva = await reservaService.findOne(Number(req.params.id));
        if (!reserva) {
            const response: MessageResponse = {
                success: false,
                message: 'Reserva no encontrada',
                code: 404
            };
            return res.status(404).json(response);
        }
        const response: MessageResponse = {
            success: true,
            message: 'Reserva encontrada',
            code: 200,
            data: reserva
        };
        return res.status(200).json(response);
    }

    public async update(req: Request, res: Response) {
        const reservaDto = req.body as ReservaDto;
        const validation = validate(reservaDto);
        if (!validation.success) {
            const response: MessageResponse = {
                success: false,
                message: validation.message,
                code: 400
            };
            return res.status(400).json(response);
        }
        const reserva = await reservaService.update(Number(req.params.id), reservaDto as Reserva);
        if (!reserva) {
            const response: MessageResponse = {
                success: false,
                message: 'Reserva no encontrada',
                code: 404
            };
            return res.status(404).json(response);
        }
        const response: MessageResponse = {
            success: true,
            message: 'Reserva actualizada exitosamente',
            code: 200,
            data: reserva
        };
        return res.status(200).json(response);
    }

    public async delete(req: Request, res: Response) {
        const deleted = await reservaService.delete(Number(req.params.id));
        if (!deleted) {
            const response: MessageResponse = {
                success: false,
                message: 'Reserva no encontrada',
                code: 404
            };
            return res.status(404).json(response);
        }
        const response: MessageResponse = {
            success: true,
            message: 'Reserva eliminada exitosamente',
            code: 204
        };
        return res.status(204).json(response);
    }

    public async actualizarEstado(req: Request, res: Response) {
        const { estado } = req.body;
        const reserva = await reservaService.actualizarEstado(Number(req.params.id), estado);
        if (!reserva) {
            const response: MessageResponse = {
                success: false,
                message: 'Reserva no encontrada o estado no válido',
                code: 404
            };
            return res.status(404).json(response);
        }
        const response: MessageResponse = {
            success: true,
            message: 'Estado de la reserva actualizado exitosamente',
            code: 200,
            data: reserva
        };
        return res.status(200).json(response);
    }
}