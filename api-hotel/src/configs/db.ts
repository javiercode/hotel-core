import { DataSource } from "typeorm";
import { Servicio } from "../entities/Servicio";
import { User } from "../entities/User";
import {createConnection} from "mysql2";
import { Cliente } from "../entities/Cliente";
import { Reserva } from "../entities/Reserva";
import { Habitacion } from "../entities/Habitacion";

export const MysqlDataSource = new DataSource({
    type: 'mysql',
    host: process.env.MYSQLDB_HOST,
    port: Number(process.env.MYSQLDB_PORT),
    username: process.env.MYSQLDB_USR,
    password: process.env.MYSQLDB_PSW,
    database: process.env.MYSQLDB,
    synchronize: true,
    driver:createConnection,
    entities: [
        // "./src/entities/*.ts"
        User,Servicio,Cliente,Reserva,Habitacion
    ],
    
})

