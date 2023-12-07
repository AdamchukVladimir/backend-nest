import {BelongsToMany, Column, DataType, Model, Table, HasMany} from "sequelize-typescript"
import { ApiProperty } from "@nestjs/swagger";
import {Role} from '../roles/roles.model';
import {UserRoles} from '../roles/user-roles.model';
import { Post } from "src/posts/posts.model";

//Поля для создания объекта из класса
interface UserCreationAttr{
    email:string;
    password:string;
}
@Table({tableName: "users"})
export class User extends Model<User, UserCreationAttr>{
    @ApiProperty({example: "1", description: "Уникальный идентификатор"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "volodya@gmail.com", description: "Почтовый адрес"})
    @Column({type: DataType.STRING, unique: true, allowNull: false,})
    email: string;

    @ApiProperty({example: "12345678", description: "Пароль"})
    @Column({type: DataType.STRING, allowNull: false,})
    password: string;
    
    @ApiProperty({example: "true", description: "Статус бана"})
    @Column({type: DataType.BOOLEAN, defaultValue: false,})
    banned: boolean;

    @ApiProperty({example: "Короче, читы-бан, кемперство-бан, оскорбления-бан, оскорбление администрации-расстрел, потом бан", description: "Причина бана"})
    @Column({type: DataType.STRING})
    banReason: string;

    @BelongsToMany(()=> Role, () => UserRoles)
    roles: Role[];

    @HasMany(()=> Post)
    posts: Post[];

}