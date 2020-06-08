import express from 'express';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import multer from 'multer';
import multerConfig from './config/multer';
import { celebrate, Joi } from 'celebrate';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();


routes.get('/items', itemsController.index);
routes.get('/points/', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.post('/points',
  upload.single('image'),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      city: Joi.string().required().email(),
      uf: Joi.string().required().email().max(2),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      items: Joi.string().required(),
    })
  }),
  pointsController.create)

export default routes;
