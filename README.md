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

Screenshots of working application:

<img width="734" alt="Screenshot 2025-05-19 at 23 45 51" src="https://github.com/user-attachments/assets/d0adb590-aa6d-4962-8bd0-64d850635e4b" />
<img width="572" alt="Screenshot 2025-05-19 at 23 46 06" src="https://github.com/user-attachments/assets/1584f080-e9d8-41a6-83ae-075ff0b86efa" />
