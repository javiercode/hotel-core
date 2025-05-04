import { Cliente } from '../entities/Cliente';
import { ClienteRepository } from '../repositories/ClienteRepository';
import { ClienteDto } from '../entities/dto/ClienteDto';

export class ClienteService {
    private clienteRepository = new ClienteRepository();

    async findAll(take: number, skip: number): Promise<[Cliente[], number]> {
        return await this.clienteRepository.findAll(take, skip);
    }

    async findOne(id: number): Promise<Cliente | null> {
        return await this.clienteRepository.findOne(id);
    }

    async create(clienteDto: ClienteDto): Promise<Cliente> {
        // Mapear ClienteDto a Cliente
        const cliente = new Cliente(clienteDto);

        return await this.clienteRepository.create(cliente);
    }

    async update(id: number, cliente: Partial<ClienteDto>): Promise<Cliente | null> {
        const existingCliente = await this.findOne(id);
        if (!existingCliente) return null;

        Object.assign(existingCliente, cliente);
        return await this.clienteRepository.update(id, existingCliente);
    }

    async delete(id: number): Promise<boolean> {
        return await this.clienteRepository.delete(id);
    }
}
