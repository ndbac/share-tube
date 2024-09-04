# ShareTube Documentation

##### ShareTube is a movie sharing site where you can register an account and share movies you like within a click.

## Features
- **Registration & Login**: Create an account and log in to access all features.
- **Share Clip**: Share your favorite movie clips instantly.
- **View Videos**: All shared videos are listed on the homepage for easy viewing.
- **Instant Notifications**: Receive instant notifications when others share clips.

Website: https://sharetube.checkly.world
API Docs: https://sharetube-server.checkly.world/sharetube/docs

## Prerequisites
1. Node.js version >= 18
2. Docker
3. npm
4. yarn

## Installation (Manually)

Clone this repository

```bash
git clone https://github.com/ndbac/share-tube.git
```

##### Backend instructions:

```bash
$ cd backend

# Install dependencies
$ yarn

# Create .env file
$ cp .env.example .env

# Create database (Docker must be available when you trigger this command)
$ yarn run local:database

# Run database migration
$ yarn run migration:run

# Start server (http://localhost:3001/sharetube/docs)
$ yarn run start:dev

# If using Docker then you only need to run this command
$ yarn run local:server
```

##### Frontend instructions:

```bash
$ cd frontend

# Install dependencies
$ npm i .

# Create .env file
$ cp .env.example .env

# Start app (http://localhost:3000)
$ npm run dev
```

## Installation (Docker)

```bash
# Run backend and frontend with docker
# Frontend: http://localhost:3000
# Backend: http://localhost:3001/sharetube/docs
$ docker-compose up
```

## Testing

```bash
# Frontend
$ cd frontend
$ npm run test

# Backend
$ cd backend
$ yarn run test
```

## Usage

Register and login to an accoun first

![alt](/assets/images/register.png)
![alt](/assets/images/login.png)

Home page where you can view other shares
![alt text](/assets/images/home.png)

There will be a notification on the bottom left corner when someone shares a video
![alt text](/assets/images/noti.png)

If you want to share a video, just paste the Youtube video link and click share in Share page
![alt text](/assets/images/share.png)

- Website: https://sharetube.checkly.world
- API Docs: https://sharetube-server.checkly.world/sharetube/docs

## Troubleshooting

##### Cannot share Youtube videos:
If server and frontend are running and you still cannot share videos, that may due to Youtube API quota limit, please open a new issue or email me (ndinhbac.0@gmail.com).

##### Database not found issue:
If you run command `yarn run local:database` successfully but the server keep continue throw database not found error, please double check if there is any other services that also running on the same port with database.
