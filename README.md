### UpTrack - Structured roadmap app

- Client repository: [https://github.com/jamshed-uddin/roadmap-app-client](https://github.com/jamshed-uddin/roadmap-app-client)
- live demo: [https://uptrack-nine.vercel.app/](https://uptrack-nine.vercel.app/)

## Run Locally

**Clone the repository**

```bash
git clone https://github.com/jamshed-uddin/roadmap-app-server.git

```

**Change directory**

```bash
cd roadmap-app-server
```

**Install packages**

```bash
npm install
```

**Set environment variables**

```env
DB_URI= your mongodb uri
PORT=8000
SECRET= any secret key
```

**Start the app**

```bash
node index.js

or

nodemon index.js
```

## Dependencies

```json
"dependencies": {
    "bcryptjs": "^3.0.2",
    "cors": "^2.8.5",
    "dotenv": "^16.5.0",
    "express": "^5.1.0",
    "joi": "^17.13.3",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.15.2"
  }

```
