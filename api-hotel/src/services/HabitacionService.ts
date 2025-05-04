import { Habitacion } from '../entities/Habitacion';
import { HabitacionRepository } from '../repositories/HabitacionRepository';
import { HabitacionDto } from '../entities/dto/HabitacionDto';

export class HabitacionService {
    private habitacionRepository = new HabitacionRepository();

    async findAll(take: number, skip: number): Promise<[Habitacion[], number]> {
        return await this.habitacionRepository.findAll(take, skip);
        // return await this.habitacionRepository.findAll(10, 0);
    }

    async findOne(id: number): Promise<Habitacion | null> {
        return await this.habitacionRepository.findOne(id);
    }

    async create(habitacionDto: HabitacionDto): Promise<Habitacion> {
        // Mapear HabitacionDto a Habitacion
        const habitacion = new Habitacion(habitacionDto);

        return await this.habitacionRepository.create(habitacion);
    }

    async update(id: number, habitacion: Partial<HabitacionDto>): Promise<Habitacion | null> {
        const existingHabitacion = await this.findOne(id);
        if (!existingHabitacion) return null;

        Object.assign(existingHabitacion, habitacion);
        return await this.habitacionRepository.update(id, existingHabitacion);
    }

    async delete(id: number): Promise<boolean> {
        return await this.habitacionRepository.delete(id);
    }
}
