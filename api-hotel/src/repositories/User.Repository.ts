import { DeleteResult, EntityRepository,  Like,  UpdateResult, InsertResult, SaveOptions } from "typeorm";
import { User } from "../entities/User";
import { UserDto, UserEditPassDto } from "../entities/dto/UserDto"
import { ListPaginate } from "../entities/dto/GeneralDto"
import { MysqlDataSource } from "../configs/db";
import { EstadoEnum } from "../configs/Config.enum";

class UserRepository{
    private repository = MysqlDataSource.getRepository(User);

    public async findByDto(params: UserDto): Promise<User | null> {
        let options = {};
        options = params
        const firstUser = await this.repository.findOneBy(options);
        return firstUser;
    };

    public async findByUsername(params: string): Promise<User | null> {
        let options = {};
        options = {
            where: { usuario: params }
        }
        const firstUser = await this.repository.findOne(options);
        return firstUser;
    };

    public async findByCorreo(params: string): Promise<User | null> {
        let options = {};
        options = {
            where: { email: params }
        }
        const firstUser = await this.repository.findOne(options);
        return firstUser;
    };

    public async findCredenciales(usuario: string, password:string ): Promise<User | null> {
        let options = {};
        options = {
            "usuario":usuario,
            "password":password,
        }
        // const firstUser = await this.repository.createQueryBuilder("u")
        // .where("u.usuario=:usuario",{username:usuario})
        // .andWhere("u.password=:password",{password:password})
        // .getOne();

        const firstUser = await this.repository.createQueryBuilder("u")
            .where("u.usuario = :usuario", { usuario: usuario })
            .andWhere("u.password = :password", { password: password })
            .getOne();
        return firstUser;
    };

    public async findAll(limit:number, page:number): Promise<ListPaginate | null> {
        const take = limit ||10;
        const skip = page ||0;
        const [result, total] = await this.repository.findAndCount({
            // where: { estado: true },
            take:take,
            skip:(skip * take),
            order: {
                fechaRegistro: "DESC",
            }
        });
        return {
            data: result,
            count: total
        }
    };

    public async findByIdActive(params: number): Promise<User | null> {
        let options={}
        options = {
            where: {
                _id: params,
                estado: EstadoEnum.ACTIVO
            },
        };
        const firstUser = await this.repository.findOne(options);
        return firstUser;
    };

    public async findById(params: number): Promise<User | null> {
        const firstUser = await this.repository.findOneById(params);
        return firstUser;
    };

    public async desactivar(userId: number): Promise<UpdateResult> {
        // const firstUser = await this.repository.update(userId, { estado: false });
        const firstUser = await this.repository.update(userId, { });
        return firstUser;
    };

    public async actualizar(userId: number, param: UserEditPassDto): Promise<UpdateResult> {
        const firstUser = await this.repository.update(userId, param);
        return firstUser;
    };

    public async deleteUser(params: User): Promise<DeleteResult> {
        const firstUser = await this.repository.delete((params.id));
        return firstUser;
    };

    public async save(params: User): Promise<User> {
        const firstUser = await this.repository.save(params);
        return firstUser;
    };
}
export default new UserRepository();