import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "src/exceptions/validation.exception";


@Injectable()
export class ValidationPipe implements PipeTransform<any>{
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        //Выполним некоторые преобразования
        //Получаем объект который будем валидировать
        const obj = plainToClass(metadata.metatype, value); //Преобразовывает в нужный класс
        const errors = await validate(obj); //Получаем ошибки после валидации полученного объекта

        if (errors.length){
            let message = errors.map(err =>{
                //err.propperty - поле которое не прошло валидацию
                //Object.values - значение ошибок из Dto
                return `${err.property} - ${Object.values(err.constraints).join(', ')}`
            })
            throw new ValidationException(message);
        }
        return value;

    }    
}