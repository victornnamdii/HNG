import express, { Request, Response } from 'express';
import env from './config/env';
import { pageNotFound, serverErrorHandler } from './middlewares/errorHandlers';
import userRouter from './routes/userRouter';
import { connectToDB } from './config/db';

const app = express();
const port = env.PORT;

// middlewares
app.use(express.json());

connectToDB()
  .then(() => {
    app.listen(port, () => {
      console.log('Server up and running');
    });
  });

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Ilodiuba Victor\'s API');
});

app.use('/api', userRouter);
app.use(pageNotFound);
app.use(serverErrorHandler);


export default app;
