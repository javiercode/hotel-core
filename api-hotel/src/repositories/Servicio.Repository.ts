import { DeleteResult, EntityRepository, Repository, UpdateResult } from "typeorm";
import { ServicioDto } from "../entities/dto/ServicioDto"
import {MysqlDataSource} from "../configs/db";
import { ListPaginate } from "../entities/dto/GeneralDto";
import { Servicio } from "../entities/Servicio";


class ServicioRepository{
    private repository = MysqlDataSource.getRepository(Servicio);

    public async findByDto (params: ServicioDto): Promise<number>{
        let options={}
        options={...params}
        const [result,total] = await this.repository.findAndCount(options);
        
        return total;
    };
    
    public async findById (params: number): Promise<Servicio | null>{
        const result = await this.repository.findOne(
            { where:
                    { id: params}
            }
        );
        return result
    };
     
    public async desactivar (userId: number){
        const firstUser = await this.repository.delete(userId);
        return firstUser;
    };
     
    public async actualizar (id:number, param: ServicioDto){
        let options={}
        options={id}
        const firstUser = await this.repository.update(options,param);
        return firstUser;
    };
     
    public async registrar ( param: ServicioDto){
        const firstUser = await this.repository.save(param);
        return firstUser;
    };
     
     
    public async existeUsuario (params: ServicioDto): Promise<Servicio|null>{    
        let options={}
        options={
            where:{user:params}}
        const result = await this.repository.findOne(options);
        return result
    };
    
    public async listAll (): Promise<ListPaginate>{
        const [result,total] = await this.repository.findAndCount();
        
        return {
            data: result,
            count: total
        }
    };
}

export default new ServicioRepository();