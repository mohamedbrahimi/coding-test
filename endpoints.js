import { privateRoutes, publicRoutes } from './src/app/routes';
import compression from 'compression';
import { authorizationMw } from './src/app/middlewares';
import express from "express";
const initializerRoutes = (app) => {

    app.use(express.json({ limit: '5mb' }));
    app.use(express.urlencoded({ limit: '5mb', extended: true }));
    app.use(compression());

    // CORS middleware
    const allowCrossDomain = function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    };

    app.use(allowCrossDomain);

    app.use('/public', publicRoutes);
    /**
     * @swagger
     * /users/{id}:
     *   get:
     *     description: This should return all specific user which has @id.
     *     parameters: id
     */
    app.use('/private', authorizationMw, privateRoutes);

}

export {
    initializerRoutes
}
