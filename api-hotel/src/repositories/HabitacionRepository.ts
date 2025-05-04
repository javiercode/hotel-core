import { Repository } from 'typeorm';
import { Habitacion } from '../entities/Habitacion';
import { MysqlDataSource } from '../configs/db';

export class HabitacionRepository {
    private repository: Repository<Habitacion>;

    constructor() {
        this.repository = MysqlDataSource.getRepository(Habitacion);
    }

    async findAll(take: number, skip: number): Promise<[Habitacion[], number]> {
        return await this.repository.findAndCount({ take, skip });
        // return await this.repository.findAndCount({});
    }

    async findOne(id: number): Promise<Habitacion | null> {
        return await this.repository.findOneBy({ id });
    }

    async create(habitacion: Habitacion): Promise<Habitacion> {
        return await this.repository.save(habitacion);
    }

    async update(id: number, habitacion: Partial<Habitacion>): Promise<Habitacion | null> {
        const existingHabitacion = await this.findOne(id);
        if (!existingHabitacion) return null;

        await this.repository.update(id, habitacion);
        return await this.findOne(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
}
