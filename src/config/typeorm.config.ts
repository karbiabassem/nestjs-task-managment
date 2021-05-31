import {TypeOrmModuleOptions} from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions={
    type:'postgres',
    host:'localhost',
    port: 5432,
    username: 'bassem',
    password: 'box2home',
    database:'taskmanagment',
    entities:[__dirname+ '/../**/*.entity{.ts,.js}'],
    synchronize:true,

};
