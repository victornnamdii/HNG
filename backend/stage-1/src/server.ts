import express, { NextFunction, Request, Response } from 'express';
import env from './config/env';
import days from './utils/date';
import { pageNotFound, serverErrorHandler } from './middlewares/errorHandlers';

const app = express();
const port = env.PORT;

// middlewares
app.use(express.json());


app.listen(port, () => {
  console.log('Server up and running');
});

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Ilodiuba Victor\'s API');
});

app.get('/api', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slack_name, track } = req.query;
    const date = new Date();

    res.status(200).json({
      slack_name: slack_name ?? 'Missing query parameter \'slack_name\'',
      current_day: days[date.getDay() as keyof typeof days],
      utc_time: `${new Date(date.toUTCString()).toISOString().slice(0, 19)}Z`,
      track: track ?? 'Missing query parameter \'track\'',
      github_file_url: 'https://github.com/victornnamdii/HNG/blob/main/backend/stage-1/src/server.ts',
      github_repo_url: 'https://github.com/victornnamdii/HNG/tree/main/backend/stage-1',
      status_code: 200
    });
  } catch (error) {
    next(error);
  }
});

app.use(pageNotFound);
app.use(serverErrorHandler);

export default app;
