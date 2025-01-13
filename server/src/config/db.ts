import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: 'mongodb://localhost:27017/transcript',
  useUnifiedTopology: true,
  entities: [__dirname + '/entities/admin/*.ts'],
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Custom Data Source has been initialized!');
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
  });