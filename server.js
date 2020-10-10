import express from 'express';
import mongoose from 'mongoose';
import dotEnv from 'dotenv';

import { MONGO_OPTIONS, DEFALT_SERVER_HOST, DEFALT_SERVER_POST} from './src/app/condig';
import { initializerRoutes } from './endpoints'
import { swagger } from './swagger';
dotEnv.config();
const app = express();

initializerRoutes(app);
swagger(app);

    app.use('*', (req, res, next) => {
        console.error('handled');
        return res.status(500).send('{ coding: test }');
    });
    console.log(process.env.MONGODB_USER_URI)            // did this in case of .env not found after the build
  mongoose.connect(process.env.MONGODB_USER_URI || 'mongodb+srv://coding:codingtest@cluster0.seuma.gcp.mongodb.net/coding-db?retryWrites=true&w=majority' || 'mongodb://localhost:27017/codingDB', MONGO_OPTIONS).then(() => {
       console.info('connected successfully to mongoDB!');
      }
  ).catch((err) => console.error('error occurred during connection to mongoDB! ', err));


  app.listen(DEFALT_SERVER_POST, () => console.warn(`listening to http server on ${DEFALT_SERVER_HOST}:${DEFALT_SERVER_POST}...`));

  app.on('error', (err) => console.warn(err));


