const { Sequelize } = require('sequelize');

// Create a new Sequelize instance
// const sequelize = new Sequelize({
//   dialect: "mysql",
//   host: "localhost",
//   port: 3306,
//   username: 'Manan_chopra',
//   password: 'P@s$w0rd123!',
//   database: 'FluxKart',
// });
const sequelize = new Sequelize({
  dialect: "mysql",
  host: "dpg-ciftu55gkuvojje5954g-a",
  port: 5432,
  username: "mananchopradev",
  password: "HWdcyESwGCk6fIE7fdVtyZjXYeZb17F7",
  database: "devfluxkart_7bu4"
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;
