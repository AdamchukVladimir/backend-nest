import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService){}

    @Post()
    create(@Body() dto: CreateRoleDto){
        return this.roleService.createRole(dto);
    }

    //Используем динамически изменяющийся путь для значения роли
    @Get('/:value')
    getBValue(@Param('value') value: string){
        return this.roleService.getRoleByValue(value);
    }
}
