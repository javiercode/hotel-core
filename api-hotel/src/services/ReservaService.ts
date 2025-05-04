import { Reserva } from '../entities/Reserva';
import { ReservaRepository } from '../repositories/ReservaRepository';
import { ReservaDto } from '../entities/dto/ReservaDto';
import { JwtPayload } from '../entities/dto/GeneralDto';

export class ReservaService {
    private reservaRepository = new ReservaRepository();

    async findAll(take: number, skip: number,authSession: JwtPayload): Promise<[Reserva[], number]> {
        return await this.reservaRepository.findAll(take, skip);
    }

    async findOne(id: number): Promise<Reserva | null> {
        return await this.reservaRepository.findOne(id);
    }

    async create(reservaDto: ReservaDto,authSession: JwtPayload): Promise<Reserva> {
        // Mapear ReservaDto a Reserva
        const reserva = new Reserva(reservaDto);
        reserva.idCliente = authSession.userId;

        return await this.reservaRepository.create(reserva);
    }

    async update(id: number, reserva: Partial<ReservaDto>): Promise<Reserva | null> {
        const existingReserva = await this.findOne(id);
        if (!existingReserva) return null;

        Object.assign(existingReserva, reserva);
        return await this.reservaRepository.update(id, existingReserva);
    }

    async delete(id: number): Promise<boolean> {
        return await this.reservaRepository.delete(id);
    }

    async actualizarEstado(id: number, estado: string): Promise<Reserva | null> {
        return await this.reservaRepository.actualizarEstado(id, estado);
    }
}
