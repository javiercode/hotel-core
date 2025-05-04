import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Reserva } from './Reserva';
import { HabitacionDto } from './dto/HabitacionDto';

@Entity('habitacion')
export class Habitacion {
  @PrimaryGeneratedColumn({ name: "ID" })
  id: number;

  @Column({ name: 'NUMERO', type: 'varchar', length: 10 })
  numero: string;

  @Column({ name: 'NRO_CAMAS', type: 'int'})
  nroCama: number;

  @Column({ name: 'TIPO', type: 'varchar', length: 50 })
  tipo: string;

  @Column({ name: 'PRECIO', type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({ name: 'IMAGENES', type: 'json' })
  imagenes: string[];

  @CreateDateColumn({ name: "FECHA_REGISTRO", type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaRegistro: Date;

  @UpdateDateColumn({ name: "FECHA_MODIFICACION", type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  fechaModificacion: Date;


  constructor(params: HabitacionDto = {} as HabitacionDto) {
    this.numero = params.numero;
    this.tipo = params.tipo;
    this.precio = params.precio;
    this.nroCama = params.nroCama;
    this.imagenes = params.imagenes ||[];
  }
}
