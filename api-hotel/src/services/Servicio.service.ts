import { JwtPayload, MessageResponse } from '../entities/dto/GeneralDto';
import { ServicioDto } from '../entities/dto/ServicioDto';
import { Servicio} from '../entities/Servicio';
import ServicioRepository from '../repositories/Servicio.Repository';
import { getFecha } from '../configs/General.functions';
import IGrupo from './interfaces/IGrupo.interface';


class ServiciosService {

    async test(authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos!", code: 0 };
        return res;
    }


    async listAll(): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos", code: 0 };
        try {
            let query = await ServicioRepository.listAll();
            res.data = query.data;
            res.success = true;
            res.message = "Obtención exitosa";
            res.total = query.count || 0;
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }

        return res;
    }

    async edit(id: number, dto: ServicioDto, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            const userDtoFind = await ServicioRepository.findById(id) as Servicio;
            // const isActive = userDtoFind?.estado == 'A' || false;
            if (!userDtoFind ) {
                res.message = "Servicio no encontrado!";
            } else {
                res.success = true;
                res.message = "Servicio actualizado!";

                // dto.fechaModificacion = getFecha(new Date());
                const oGrupo = await ServicioRepository.actualizar(id, dto);
                res.data = dto;
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res;
    }

    async create(dto: ServicioDto, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            dto.nombre = dto.nombre.toUpperCase();
            let oServicio = new Servicio(dto);
            // oGrupo.usuarioRegistro = authSession.username;
            oServicio.fechaRegistro = getFecha(new Date())
            const oGrupoFind = await ServicioRepository.findByDto(dto);
            if(oGrupoFind==0){
                oServicio = await ServicioRepository.registrar(oServicio);
                res.success = true;
                res.message = "Servicio registrado";
                res.data = oServicio;
            }else{
                res.message = "Servicio duplicado";
            }
            
        } catch (error) {
            console.error(error);
        }
        return res;
    }
    
    async desactivar(idUser: number, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de eliminación", code: 0 };
        try {
            const userDtoFind = await ServicioRepository.findById(idUser);
            if (userDtoFind) {
                ServicioRepository.desactivar(idUser);
                res.success = true;
                res.message = "Servicio eliminado";

            } else {
                res.message = "Servicio no encontrado!";
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res;
    }
}

export default new ServiciosService();