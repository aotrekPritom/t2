import express, { Application, Request, Response } from 'express';
import router from './app/routes';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundRoute from './app/middlewares/notFoundRoute';

const app: Application = express();
// parser
app.use(cors());
app.use(express.json());

// router
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Hlw user',
  });
});

app.use(globalErrorHandler);
app.use(notFoundRoute);

export default app;
