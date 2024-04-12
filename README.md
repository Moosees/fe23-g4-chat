# Chat Application

This is a chat application built with Node.js, Express, MongoDB and Socket.IO.
Users can create channels, join existing channels, send messages in a real-time chat.

## Setup Instructions

### Clone the Repository

- [Guide to clone a repository](https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories)

Go to [fe23-g4-chat](https://github.com/Moosees/fe23-g4-chat.git) and click the <>Code button to start the cloning.
> ![<>Code](/public/assets/codebtn.png)

### Install Dependencies

```bash
npm install
```

### MongoDB

Create a database in `MongoDB Atlas` and then create a `.env` file to ad your connection to the database and also your JWT secret.

.env example:

```text
MONGODB_URI=mongodb://localhost:27017/chatdb
JWT_SECRET=your_jwt_secret_key_here
```

### Start the server

```bash
nodemon index.js
```

### Access the Application

Open your web browser and navigate to `http://localhost:3000`.

## API Endpoints

### User

- POST - /api/register
  - Register a new user.
  - Body: userName, password, senderName (optional)
  
- POST - /api/login
  - Login an existing user.
  - Body: userName, password
  
### Public

- GET - /api/broadcast
- GET - /api/channel/broadcast
  - Retrieves messages from from the public broadcast channel.

- POST - /api/broadcast
- POST - /api/channel/broadcast
  - Posts a message to the public broadcast channel.
  - Body: msg, senderName (optional)

### Private

- GET - /api/channel
  - Retrieves a list of all available channels.
  
- PUT - /api/channel
  - Creates a new channel.
  - Body: name, description (optional)
  
- GET /api/channel/:channelName
  - Retrieves messages from a specific channel.
  
- POST - /api/channel/:channelName
  - Posts a message to a specific channel.
  - Body: msg
  
- DELETE - /api/channel/:channelName
  - Deletes a channel and all its messages.

## Technologies Used**

- [Node.js](https://nodejs.org/en)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Socket.IO](https://socket.io/)

**Thank you for exploring our chat application! We hope you find it useful and intuitive to use.**
