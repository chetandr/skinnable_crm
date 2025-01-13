import 'reflect-metadata';
import app from './app';
import { AppDataSource } from './config/db';

const PORT = 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));