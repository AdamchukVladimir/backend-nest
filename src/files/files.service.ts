import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path'//работа с путями
import * as fs from 'fs';  //Работа с файлами
import * as uuid from 'uuid'; //Генерация рандомных названий

@Injectable()
export class FilesService {

    async createFile(file): Promise<string> {
        try {
            //Генерация уникального названия файла
            const fileName = uuid.v4() + '.jpg';
            //Получаем путь к файлу,__dirname - текущая папка, '..'-возвращаемся на одну назад, далее папка static
            //path.resolve -все склеит в нормальный путь
            const filePath = path.resolve(__dirname, '..', 'static')
            //Если по пути ничего не существует, то создаем папку
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            //Записываем файл по "склеенному" пути
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName;
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}