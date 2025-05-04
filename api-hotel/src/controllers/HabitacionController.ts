import { Request, Response } from 'express';
import { HabitacionService } from '../services/HabitacionService';
import { HabitacionDto, HabitacionRegex } from '../entities/dto/HabitacionDto';
import { MessageResponse } from '../entities/dto/GeneralDto';

const habitacionService = new HabitacionService();

function validate(dataForm: HabitacionDto): { success: boolean; message: string } {
    let res = { success: false, message: 'Error de validación del(los) campo(s): ' };
    try {
        let campoError: string[] = [];
        Object.keys(HabitacionRegex).forEach((key: string) => {
            const value = dataForm[key as keyof HabitacionDto];
            const regexValue = HabitacionRegex[key as keyof HabitacionDto] as string;
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

export class HabitacionController {
    public async create(req: Request, res: Response) {
        const habitacionDto = req.body as HabitacionDto;
        const validation = validate(habitacionDto);
        if (!validation.success) {
            const response: MessageResponse = {
                success: false,
                message: validation.message,
                code: 400
            };
            return res.status(400).json(response);
        }
        const habitacion = await habitacionService.create(habitacionDto);
        const response: MessageResponse = {
            success: true,
            message: 'Habitación creada exitosamente',
            code: 201,
            data: habitacion
        };
        return res.status(201).json(response);
    }

    public async findAll(req: Request, res: Response) {
        const take = parseInt(req.query.limit as string) || 10;
        const skip = (parseInt(req.query.page as string) ) * take || 0;
        const [result, total] = await habitacionService.findAll(take, skip);
        const response: MessageResponse = {
            success: true,
            message: 'Habitaciones obtenidas exitosamente',
            code: 200,
            data: result,
            total
        };
        return res.status(200).json(response);
    }

    public async findOne(req: Request, res: Response) {
        const habitacion = await habitacionService.findOne(Number(req.params.id));
        if (!habitacion) {
            const response: MessageResponse = {
                success: false,
                message: 'Habitación no encontrada',
                code: 404
            };
            return res.status(404).json(response);
        }
        const response: MessageResponse = {
            success: true,
            message: 'Habitación encontrada',
            code: 200,
            data: habitacion
        };
        return res.status(200).json(response);
    }

    public async update(req: Request, res: Response) {
        const habitacionDto = req.body as HabitacionDto;
        const validation = validate(habitacionDto);
        if (!validation.success) {
            const response: MessageResponse = {
                success: false,
                message: validation.message,
                code: 400
            };
            return res.status(400).json(response);
        }
        const habitacion = await habitacionService.update(Number(req.params.id), habitacionDto);
        if (!habitacion) {
            const response: MessageResponse = {
                success: false,
                message: 'Habitación no encontrada',
                code: 404
            };
            return res.status(404).json(response);
        }
        const response: MessageResponse = {
            success: true,
            message: 'Habitación actualizada exitosamente',
            code: 200,
            data: habitacion
        };
        return res.status(200).json(response);
    }

    public async delete(req: Request, res: Response) {
        const deleted = await habitacionService.delete(Number(req.params.id));
        if (!deleted) {
            const response: MessageResponse = {
                success: false,
                message: 'Habitación no encontrada',
                code: 404
            };
            return res.status(404).json(response);
        }
        const response: MessageResponse = {
            success: true,
            message: 'Habitación eliminada exitosamente',
            code: 204
        };
        return res.status(204).json(response);
    }
}
