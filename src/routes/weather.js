const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: 'City is required' });

  try {
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json`, {
      params: {
        key: process.env.WEATHER_API_KEY,
        q: city,
      },
    });
    const { temp_c, humidity, condition } = response.data.current;
    res.json({
      temperature: temp_c,
      humidity,
      description: condition.text,
    });
  } catch (error) {
    res.status(404).json({ error: 'City not found' });
  }
});

module.exports = router;
