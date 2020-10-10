import swaggerUiExpress from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const options = {
    swaggerDefinition: {
        info: {
            title: 'API Documentation ...',
            version: '1.0.0',
            description: 'Auto generation of code documentation with thanks to swagger api'
        },
        basePath: '/',
    },
    apis: [
        'src/app/routes/public.route.js',
        'src/app/routes/secure.route.js',
    ]
}

const specs = swaggerJsDoc(options);

const swagger = (app) => {
    app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
};


export  {
    swagger
}

