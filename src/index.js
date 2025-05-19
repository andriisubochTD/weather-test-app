const express = require('express');
const path = require('path');
const { sequelize } = require('./models');
const weatherRoutes = require('./routes/weather');
const subscriptionRoutes = require('./routes/subscription');
const { sendWeatherUpdates } = require('./services/weatherUpdates');

const app = express();
const PORT = process.env.PORT || 3000;

// Обслуговування статичних файлів із папки public
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Маршрути API
app.use('/api/weather', weatherRoutes);
app.use('/api', subscriptionRoutes);

// Синхронізація бази даних і запуск сервера
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    sendWeatherUpdates(); // Запуск планувальника оновлень
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
