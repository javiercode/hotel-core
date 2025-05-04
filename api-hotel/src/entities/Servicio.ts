import {Column, Entity, PrimaryColumn, CreateDateColumn, ObjectIdColumn, OneToOne, JoinColumn,ManyToOne, BaseEntity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ServicioDto } from './dto/ServicioDto';

@Entity('servicio')
export class Servicio{
    
    @PrimaryGeneratedColumn({name:"ID"})
    id: number

    @Column({name:'NOMBRE',type:'varchar',length:150})
    nombre:string;

    @Column({name:'DESCRIPCION',type:'varchar',length:250})
    descripcion:string;

    @Column({name:'PRECIO',type:'decimal',precision:2})
    precio:number;

    
    @CreateDateColumn({ name: "FECHA_REGISTRO", type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fechaRegistro: Date;

    @UpdateDateColumn({ name: "FECHA_MODIFICACION", type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    fechaModificacion: Date;

    constructor(params: ServicioDto = {} as ServicioDto){
        this.nombre = params.nombre;
        this.descripcion = params.descripcion;
        this.precio = params.precio || 0;
        
    }
}