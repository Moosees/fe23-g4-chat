# Chat Application

This is a chat application built with Node.js, Express, MongoDB and Socket.IO.
Users can create channels, join existing channels, send messages in a real-time chat.

## Setup Instructions

**Clone the Repository**

```bash
git clone https://github.com/Moosees/fe23-g4-chat.git
```

**Install Dependencies:**
```bash
npm install
```

**MongoDB**

Create a database in `([MongoDB Atlas](https://www.mongodb.com/))` and then create a `.env` file to ad your connection to the database and also your JWT secret.

**Start the server**

```bash
nodemon index.js
```

**Access the Application**

Open your web browser and navigate to `http://localhost:3000`.


# API Endpoints

- POST - /api/register
  - Register a new user.
  
- POST - /api/login
  - Login an existing user.
  
- GET - /api/channel
  - Retrieves a list of all available channels.
  
- PUT - /api/channel
  - creates a new channel.
  
- GET /api/channel/:channelName
  - Retrieves messages from a specific channel.
  
- POST - /api/channel/:channelName
  - Posts a message to a specific channel.
  
- DELETE - /api/channel/:channelName
  - Deletes a channel and all its messages.

- GET - /api/broadcast
- GET - /api/channel/broadcast
  - Retrieves messages from from the public broadcast channel.

- POST - /api/broadcast
- POST - /api/channel/broadcast
  - Posts a message to the public broadcast channel.


**Technologies Used**

- [Node.js]([https://](https://nodejs.org/en))
- [Express.js]([https://](https://expressjs.com/))
- [MongoDB]([https://](https://www.mongodb.com/))
- [Socket.IO]([https://](https://socket.io/))


Thank you for exploring our chat application! We hope you find it useful and intuitive to use.
