import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript"
import { ApiProperty } from "@nestjs/swagger";
import {UserRoles} from './user-roles.model';
import {User} from "../users/users.model";

//Поля для создания объекта из класса
interface RoleCreationAttr{
    value:string;
    password:string;
}
@Table({tableName: "roles"})
export class Role extends Model<Role, RoleCreationAttr>{
    @ApiProperty({example: "1", description: "Уникальный идентификатор"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "ADMIN", description: "Уникальное значение роли"})
    @Column({type: DataType.STRING, unique: true, allowNull: false,})
    value: string;

    @ApiProperty({example: "Администратор", description: "Описание роли Администратор"})
    @Column({type: DataType.STRING, allowNull: false,})
    description: string;

    @BelongsToMany(()=> User, () => UserRoles)
    users: User[];

}