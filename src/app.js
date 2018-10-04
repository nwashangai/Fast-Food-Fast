import config from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import routes from './routes';
import migration from './models/migration';

const app = express();
config.config();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', routes);
app.use((req, res, next) => {
  res.status(404);
  res.send({ error: '404 Sorry the page has not yet been defined try /api/v1/' });
});

app.listen(process.env.PORT || 3000, () => {
  migration().then(() => {
    console.log('>> migration successful');
  });
});

export default app;
