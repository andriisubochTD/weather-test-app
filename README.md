# Weather Subscription API

API for subscribing to weather updates based on a provided `swagger.yaml`.

## Features
- **Current Weather Lookup**: Retrieve real-time weather data (temperature, humidity, description) for a specified city using WeatherAPI.com (`GET /api/weather`).
- **Email Subscriptions**: Subscribe an email address to receive hourly or daily weather updates for a chosen city (`POST /api/subscribe`).
- **Subscription Confirmation**: Activate subscriptions via a unique token sent in a confirmation email (`GET /api/confirm/{token}`).
- **Unsubscribe**: Cancel subscriptions using a unique token (`GET /api/unsubscribe/{token}`).
- **Web Interface**: A user-friendly HTML page (`http://localhost:3000`) to:
  - Subscribe to weather updates by entering email, city, and frequency.
  - Check current weather for any city with a single click.
- **Periodic Updates**: Send automated weather update emails to confirmed subscribers using a cron-based scheduler.
- **Error Handling**: Manages invalid inputs, duplicate emails (`409 Conflict`), and API errors as per the API specification.

## Setup
1. Clone the repository.
2. Create `.env` with:
- WEATHER_API_KEY=your_key
- EMAIL_USER=your_email@gmail.com
- EMAIL_PASS=your_app_password
- DATABASE_URL=postgres://user:password@db:5432/weather_db
3. Run:
```bash
docker-compose up --build
```
Access API at http://localhost:3000.

## Screenshots of working application:

<img width="734" alt="Screenshot 2025-05-19 at 23 45 51" src="https://github.com/user-attachments/assets/d0adb590-aa6d-4962-8bd0-64d850635e4b" />
<img width="572" alt="Screenshot 2025-05-19 at 23 46 06" src="https://github.com/user-attachments/assets/1584f080-e9d8-41a6-83ae-075ff0b86efa" />

## Future Improvements
- Deploy to Heroku or another platform for public access.
- Add comprehensive Jest tests for all endpoints and edge cases.
- Enhance the web interface with responsive design and input validation.
- Implement rate limiting and security headers for production use.
