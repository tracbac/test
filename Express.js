const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

const uri = 'mongodb+srv://tracbac77:G49Jhu37vzG8gj2a@cluster0.r47zjgk.mongodb.net/movies?retryWrites=true&w=majority';

let client;
let collection;

async function connectMongoDB() {
  try {
    client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('movies');
    collection = db.collection('movie-list');

    return collection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return null;
  }
}
connectMongoDB().then((collection) => {
  if (!collection) {
    console.error('Failed to connect to MongoDB');
    process.exit(1);
  }

  app.get('/', (req, res) => {
    res.send('Welcome to the Movie API!');
  });

  app.get('/api/data', async (req, res) => {
    try {
      const documents = await collection.find({}).toArray();
      res.json(documents);
    } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ error: 'Error fetching data from MongoDB.' });
    }
  });

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1);
});

process.on('SIGINT', () => {
  client.close();
  console.log('MongoDB client closed');
  process.exit(0);
});