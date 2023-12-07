import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript"
import { ApiProperty } from "@nestjs/swagger";
import {Role} from './roles.model';
import {User} from "../users/users.model";

//Удалили поля т.к. вручную ничего добавлять не будем
// interface RoleCreationAttr{
//     value:string;
//     password:string;
// }

@Table({tableName: "user_roles", createdAt: false, updatedAt: false}) //Выставляем false чтобы не заполнялись поля
export class UserRoles extends Model<UserRoles>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(()=> Role)
    @Column({type: DataType.INTEGER,})
    varoleId: number;

    @ForeignKey(()=> User)
    @Column({type: DataType.INTEGER,})
    userId: number;

}