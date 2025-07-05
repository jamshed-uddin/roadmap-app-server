### UpTrack - Structured roadmap app

- Client repository: [https://github.com/jamshed-uddin/roadmap-app-client](https://github.com/jamshed-uddin/roadmap-app-client)
- live demo: [https://uptrack-nine.vercel.app/](https://uptrack-nine.vercel.app/)

## Tech stack

- Node js (Express js)
- MongoDB + Mongoose
- JWT
- Bscrypt js
- Joi

## API endpoints

Private routes require authorization token with request headers : `Authorization : Bearer {token} `

### Users

#### 1. Register user

- `POST /api/users/register`
- `Access: public`
- `Body: `

```js
{
    name: string,
    email: string,
    password: string
}
```

#### 2. Login user

- `POST /api/users/login`
- `Access: public`
- `Body: `

```js
{
   email: string,
   password: string
}
```

#### 3. Change password

- `POST /api/users/changepassword`
- `Access: Private`
- `Body: `

```js
{
   userId: string,
   currentPassword: string,
   newPassword: string
}
```

#### 4. Update user - updates only user's name

- `POST /api/users/:id`
- `Access: Private`
- `Body: `

```js
{
  name: string;
}
```

#### 5. Delete user

- `DELETE /api/users/:id`
- `Access: Private`
- `Body: `

```js
{
  password: string;
}
```

### Roadmaps

#### 1. Get roadmaps

- `GET /api/roadmaps`
- `Access: Public`
- `query params:`
  - `popular: boolean (optional)`
  - `status: 'in_progress' | 'complete' (optional)`

#### 2. Get a roadmap

- `GET /api/roadmaps/:id`
- `Access: Public`

### Roadmap items

#### 1. Get a roadmap item

- `GET /api/roadmapitems/:id`
- `Access: Public`

### Upvotes

#### 1. Get upvotes

- `GET /api/upvotes`
- `Access: Public`
- `query params:`
  - `itemId: string;`

#### 2. Save upvote

- `POST /api/upvotes`
- `Access: Private`
- `Body`:

```js
{
  itemId: string;
}
```

#### 3. Delete/remove upvote

- `DELETE /api/upvotes/:id`
- `Access: Private`

### Comments

#### 1. Get comment on a roadmap item

- `GET /api/comments`
- `Access: Public`
- `query params:` `item: string;`

#### 2. Create comment

- `POST /api/comments`
- `Access: Private`
- `Body:`

```js
{
    itemId: string,
    content: string,
    replyTo: string
}
```

#### 3. Update comment

- `PUT /api/comments/:id`
- `Access: Private`
- `Body:`

```js
{
    content: string,
    userId: string,
}
```

#### 4. Delete comment

- `DELETE /api/comments/:id`
- `Access: Private`

### Progress

#### 1. Save progress

- `POST /api/progresses`
- `Access: Private`
- `Body:`

```js
{
  itemId: string,
  roadmapId: string,
  status:string
}
```

#### 2. Get roadmap progress

- `GET /api/roadmap-progress/:roadmapId`
- `Access: Private`

#### 3. Get individual roadmap item progress

- `GET /api/progresses/:itemId`
- `Access: Private`

#### 4. Update progress status

- `PUT /api/:itemId`
- `Access: Private`
- `Body:`

```js
{
  status: string;
}
```

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
