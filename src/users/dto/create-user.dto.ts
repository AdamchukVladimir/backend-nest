import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, Length } from "class-validator";

export class CreateUserDto{
    @ApiProperty({example: "volodya@gmail.com", description: "Почтовый адрес"})
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: 'некорректный Email'})
    readonly email: string;

    @ApiProperty({example: "12345678", description: "Пароль"})
    @IsString({message: 'Пароль должен быть строкой'})
    @Length( 4, 16, {message: 'Не менее 4 символов и не более 16'})
    readonly password: string;
}