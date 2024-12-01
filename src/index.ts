console.log("App starting...");

import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import reportsRoutes from './routes/reports';
import projectRoutes from './routes/projectsRoutes';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const API_PASSWORD = "password123";

const passwordAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const password = req.headers['x-api-password'] as string | undefined;

  if (password && password === API_PASSWORD) {
    next(); 
  } else {
    res.status(403).json({ message: 'Access denied: Invalid password' });
  }
};

app.use('/api', passwordAuthMiddleware,reportsRoutes);
app.use('/api',passwordAuthMiddleware,projectRoutes); 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
