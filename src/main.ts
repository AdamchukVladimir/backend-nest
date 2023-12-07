import { NestFactory } from "@nestjs/core";
import {AppModule} from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "./pipes/validation.pipes";

async function start(){
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle("Nest documentation")
        .setDescription("Nest documentation REST API")
        .setVersion("2.2.8")
        .addTag("Volodya Bydlow")
        .build()
    
    const document = SwaggerModule.createDocument(app, config);    
    SwaggerModule.setup('/api/docs', app, document);

    //Устанавливаем pipe глобано для валидации данных, будут отрабатывать для каждого эндпоинта
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => console.log(`Server started at ${PORT}`));
}

start()