import express, { application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import morgan from 'morgan';
import cors from 'cors';
import fs from 'fs';

import loginRoutes from './routes/login.routes'
import userRoutes from './routes/user.routes'
import servicioRoutes from './routes/servicio.routes'
import clienteRoutes from './routes/cliente.route'
import reservaRoutes from './routes/reserva.route'
import habitacionRoutes from './routes/habitacion.route'

import Helmet from 'helmet';
import rateLimit from 'express-rate-limit'
import { TokenMiddleware } from './configs/TokenMiddleware';

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 15 minutes
	// max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	// windowMs: 10000, // 15 minutes
	max: 150, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	// standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	// legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	message:'Cantidad de solicitudes exedio la capacidad por el tiempo.'
})

const app = express();

const swaggerOptions = {
	swaggerDefinition: {
	  openapi: '3.0.0',
	  info: {
		title: 'API Documentación HOTEL',
		version: '1.0.0',
	  },
	  components: {
		securitySchemes: {
		  bearerAuth: {
			type: 'http',
			scheme: 'bearer',
			bearerFormat: 'JWT',
		  },
		},
	  },
	  security: [
		{
		  bearerAuth: [],
		},
	  ],
	},
	apis: ['./src/routes/*.ts'], // Ruta a tus archivos de rutas
  };
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use(cors({
    exposedHeaders: ['Authorization']
}));
// app.options('*', cors());

app.use(morgan('dev'));
// app.use(cors());

app.use(express.json())

app.use((err:any, req:any, res:any, next:any) => {
	if (err) {
	  console.error('Invalid Request data')
	  res.send('Petición de request invalido')
	} else {
	  next()
	}
  })

app.use(Helmet());
app.use(limiter);
app.use(TokenMiddleware);

app.use(process.env.URL_PATH+"",loginRoutes);
app.use(process.env.URL_PATH+"",servicioRoutes);
app.use(process.env.URL_PATH+"",userRoutes);
app.use(process.env.URL_PATH+"",clienteRoutes);
app.use(process.env.URL_PATH+"",reservaRoutes);
app.use(process.env.URL_PATH+"",habitacionRoutes);

export default app;