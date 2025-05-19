# Weather Subscription API

API for subscribing to weather updates based on a provided `swagger.yaml`.

## Features
- Get current weather for a city (`GET /weather`).
- Subscribe to hourly or daily weather updates (`POST /subscribe`).
- Confirm subscription (`GET /confirm/{token}`).
- Unsubscribe (`GET /unsubscribe/{token}`).

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