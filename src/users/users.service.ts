import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto"
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {


    constructor(@InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService){}

    // Dto, в нашем случае User это объект данных, который используется для передачи информации между различными компонентами или слоями приложения
    async createUser(dto: CreateUserDto){ 
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("USER");
        //Используем метод $set чтобы обновить поле и перезаписать его в БД
        //Достаем из Роли id и присваиваем его массивному полю 'roles' пользователя
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user;
    }

    async getAllUsers(){
        //include all: true позволяет получать все связанные модели у мользователя
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserByEmail(email: string){
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user;
    }

    async addRole(dto: AddRoleDto){
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user){
            await user.$add('role', role.id);
            return dto
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if(!user){
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }

}
