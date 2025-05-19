const request = require('supertest');
const app = require('../index');
const { sequelize } = require('../models');
const axios = require('axios');

jest.mock('axios');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('GET /api/weather', () => {
  it('should return weather data for a valid city', async () => {
    axios.get.mockResolvedValue({
      data: {
        current: {
          temp_c: 20,
          humidity: 60,
          condition: { text: 'Sunny' },
        },
      },
    });

    const response = await request(app).get('/api/weather?city=Kyiv');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      temperature: 20,
      humidity: 60,
      description: 'Sunny',
    });
  });

  it('should return 400 for missing city', async () => {
    const response = await request(app).get('/api/weather');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'City is required' });
  });
});
