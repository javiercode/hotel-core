import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Reserva } from './Reserva';
import { ClienteDto } from './dto/ClienteDto';


@Entity('cliente')
export class Cliente {
  @PrimaryGeneratedColumn({ name: "ID" })
  id: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 200 })
  nombre: string;

  @Column({ name: 'EMAIL', type: 'varchar', length: 100 })
  email: string;

  @Column({ name: 'TELEFONO', type: 'varchar', length: 20, nullable: true })
  telefono: string;

  @CreateDateColumn({ name: "FECHA_REGISTRO", type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaRegistro: Date;

  @UpdateDateColumn({ name: "FECHA_MODIFICACION", type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  fechaModificacion: Date;

  

  constructor(params: ClienteDto = {} as ClienteDto) {
    this.nombre = params.nombre;
    this.email = params.email;
    this.telefono = params.telefono || "";
  }
}