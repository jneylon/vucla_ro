import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import bravos_sources from './api/bravos_sources.routes.js'
const app = express();

app.use(cors({
    origin: '*'
}));
process.env.NODE_ENV !== "prod" && app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api', function (req, res) {
  res.json({
    message: 'Behold the MEVN!'
  });
});

app.use('/api/bravos_sources', bravos_sources);
app.use("*", (req, res) => res.status(404).json({ error: 'not found :(' }))

export default app

