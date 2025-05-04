import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Habitacion } from './Habitacion';
import { User } from './User';
import { Cliente } from './Cliente';
import { ReservaDto } from './dto/ReservaDto';



@Entity('reserva')
export class Reserva {
  @PrimaryGeneratedColumn({ name: "ID" })
  id: number;

  @Column({ name: 'FECHA_INICIO', type: 'date' })
  fechaInicio: string;

  @Column({ name: 'FECHA_FIN', type: 'date' })
  fechaFin: string;

  @CreateDateColumn({ name: "FECHA_REGISTRO", type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaRegistro: Date;

  @Column({ name: 'ESTADO', type: 'enum', enum: ['PENDIENTE', 'CONFIRMADO', 'CANCELADO', 'PAGADO', 'CHECK_IN', 'CHECK_OUT'], default: 'PENDIENTE' })
  estado: string;

  @UpdateDateColumn({ name: "FECHA_MODIFICACION", type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  fechaModificacion: Date;


  @Column({ name: 'HABITACION_ID', type: 'int' })
  idHabitacion: number;

  @Column({ name: 'CLIENTE_ID', type: 'int' })
  idCliente: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'USUARIO_REGISTRO' })
  usuarioRegistro: User;

  constructor(params: ReservaDto = {} as ReservaDto) {
    this.fechaInicio = params.fechaInicio;
    this.fechaFin = params.fechaFin;
    this.estado = params.estado;
    this.idCliente = 0;
    this.idHabitacion = params.idHabitacion;
  }
}
