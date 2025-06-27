const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Product API',
            version: '1.0.0',
            description: 'API documentation for the Product Management System',
        },
    },
    apis: ['./src/routes/*.js'], // Đường dẫn đến các tệp chứa chú thích Swagger
};

const swaggerSpec = swaggerJsDoc(options);

module.exports ={
    swaggerSpec
}