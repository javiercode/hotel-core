import { Repository, SelectQueryBuilder } from 'typeorm';
import { Reserva } from '../entities/Reserva';
import { MysqlDataSource } from '../configs/db';
import { Cliente } from '../entities/Cliente';
import { Habitacion } from '../entities/Habitacion';
import { User } from '../entities/User';

export class ReservaRepository {
    private repository: Repository<Reserva>;

    constructor() {
        this.repository = MysqlDataSource.getRepository(Reserva);
    }

    async findAll(take: number, skip: number): Promise<[Reserva[], number]> {

        const [data, count] = await this.repository.createQueryBuilder('reserva')
            .innerJoinAndMapOne(
                'reserva.cliente',
                User,
                'cliente',
                'reserva.idCliente = cliente.id'
            )
            .innerJoinAndMapOne(
                'reserva.habitacion',
                Habitacion,
                'habitacion',
                'reserva.idHabitacion = habitacion.id'
            )
            // .where(optionQuery)
            // .andWhere('tarea.estado != :estado', {estado: EstadoTareaEnum.ELIMINADO})
            .skip(skip)
            .take(take)
            .orderBy("reserva.fechaRegistro", "DESC")
            .getManyAndCount();

            // res = { data, count };
        return [data, count];
  }

    async findOne(id: number): Promise<Reserva | null> {
        return await this.repository.findOneBy({ id });
    }

    async create(reserva: Reserva): Promise<Reserva> {
        return await this.repository.save(reserva);
    }

    async update(id: number, reserva: Partial<Reserva>): Promise<Reserva | null> {
        const existingReserva = await this.findOne(id);
        if (!existingReserva) return null;

        await this.repository.update(id, reserva);
        return await this.findOne(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }

    async actualizarEstado(id: number, estado: string): Promise<Reserva | null> {
        const existingReserva = await this.findOne(id);
        if (!existingReserva) return null;

        existingReserva.estado = estado;
        return await this.repository.save(existingReserva);
    }
}
