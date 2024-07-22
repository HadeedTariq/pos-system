"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const connectToDb_1 = require("./dbConnection/connectToDb");
const exception_filter_1 = require("./exception.filter");
const cookieParser = require("cookie-parser");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { rawBody: true });
    const configureService = app.get(config_1.ConfigService);
    const port = configureService.get('PORT');
    const clientUrl = configureService.get('CLIENT_URL');
    app.enableCors({
        origin: [clientUrl, 'http://192.168.10.7:5173'],
        credentials: true,
        exposedHeaders: ['Set-Cookie'],
    });
    app.use(cookieParser());
    app.useGlobalFilters(new exception_filter_1.CustomExceptionFilter());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('QuickSell API')
        .setDescription('Quick Sell Api a pos system')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(port);
    await (0, connectToDb_1.connectToDb)();
}
bootstrap();
//# sourceMappingURL=main.js.map