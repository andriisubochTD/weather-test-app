const cron = require('node-cron');
const axios = require('axios');
const nodemailer = require('nodemailer');
const { Subscription } = require('../models');

const sendWeatherUpdates = () => {
  // Щогодини
  cron.schedule('0 * * * *', async () => {
    console.log('Sending hourly weather updates');
    const subscriptions = await Subscription.findAll({ where: { frequency: 'hourly', confirmed: true } });
    await sendEmails(subscriptions);
  });

  // Щоденно о 8:00
  cron.schedule('0 8 * * *', async () => {
    console.log('Sending daily weather updates');
    const subscriptions = await Subscription.findAll({ where: { frequency: 'daily', confirmed: true } });
    await sendEmails(subscriptions);
  });
};

const sendEmails = async (subscriptions) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  for (const sub of subscriptions) {
    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/current.json`, {
        params: {
          key: process.env.WEATHER_API_KEY,
          q: sub.city,
        },
      });
      const { temp_c, humidity, condition } = response.data.current;
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: sub.email,
        subject: `Weather Update for ${sub.city}`,
        text: `Current weather in ${sub.city}:\nTemperature: ${temp_c}°C\nHumidity: ${humidity}%\nDescription: ${condition.text}`,
      });
      console.log(`Weather update sent to ${sub.email}`);
    } catch (error) {
      console.error(`Failed to send update to ${sub.email}:`, error.message);
    }
  }
};

module.exports = { sendWeatherUpdates };
