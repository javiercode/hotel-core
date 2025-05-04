
import "reflect-metadata";
import 'dotenv/config';
import app from "./app";
import { MysqlDataSource} from "./configs/db";
import {ScheduledJob} from "./configs/ScheduledFunctions";

async function main(){
    try {
        
        await MysqlDataSource.initialize().catch((error:any) => {
            MysqlDataSource.manager.release();
            console.error("TypeORM mysql connection error: ", error)
        });
        console.error('Database conected');
        app.listen(process.env.PORT || 4000);
        console.info('Server is listening on port', process.env.PORT);
        
    } catch (error) {
        console.error(error);
    }
    
}

main()