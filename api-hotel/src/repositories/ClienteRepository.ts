import { Repository } from 'typeorm';
import { Cliente } from '../entities/Cliente';
import { MysqlDataSource } from '../configs/db';

export class ClienteRepository {
    private repository: Repository<Cliente>;

    constructor() {
        this.repository = MysqlDataSource.getRepository(Cliente);
    }

    async findAll(take: number, skip: number): Promise<[Cliente[], number]> {
        return await this.repository.findAndCount({ take, skip });
    }

    async findOne(id: number): Promise<Cliente | null> {
        return await this.repository.findOneBy({ id });
    }

    async create(cliente: Cliente): Promise<Cliente> {
        return await this.repository.save(cliente);
    }

    async update(id: number, cliente: Partial<Cliente>): Promise<Cliente | null> {
        const existingCliente = await this.findOne(id);
        if (!existingCliente) return null;

        await this.repository.update(id, cliente);
        return await this.findOne(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
}
