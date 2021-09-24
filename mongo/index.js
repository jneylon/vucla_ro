import dotenv from 'dotenv'
import app from './app.js'
import MongoClient from 'mongodb'
import BravosSourcesDAO from './dao/bravos_sources.js';

dotenv.config()

// Connection Info
const port = process.env.PORT || 3000;
const host = process.env.EXP_IP || 'localhost';
const url = process.env.VUCLARO_DB_URI;
const dbName = process.env.VUCLARO_NS;

// Create a new MongoClient
MongoClient.connect(url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .catch(error => {
      console.error(error.stack)
      process.exit(1)
  })
  .then(async client => {
    console.log(`Connected: ${url}`)
    console.log(`Database: ${dbName}`)
    await BravosSourcesDAO.injectDB(client)
    app.listen(port, host, () => {
        console.log(`Server listening on http://${host}:${port}`);
      });
  })

