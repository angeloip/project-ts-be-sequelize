import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('storedb', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
});

const checkDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export const checkSync = async () => {
  try {
    await checkDBConnection()
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to synchronize models:', error);
  }
}