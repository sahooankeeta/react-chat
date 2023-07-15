const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const { MongoClient } = require("mongodb");
const dotenv=require("dotenv")

dotenv.config({ path: ".env" });
app.use(cors());

const PORT = process.env.PORT;
const DB = process.env.DB.replace("<password>", process.env.DB_PASSWORD);
const client = new MongoClient(DB);
async function main() {
    // Use connect method to connect to the server
    await client.connect();
    return 'Connected successfully to database';
  }
  
main()
.then(console.log)
.catch(console.error)
.finally(() => client.close());

const socketIO = require('socket.io')(http, {
    cors: {
        origin: process.env.CLIENT_URL
    }
});


//Add this before the app.get() block
socketIO.on('connection', (socket) => {
    console.log(`user just connected!`);
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
});


app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});