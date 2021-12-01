// wire up the module
// const express = require('express') 
import express from 'express'
// create server instance
const app = express() 
// bind the request to an absolute path or relative to the CWD
app.use(express.static('frontend/dist'))
// Connection Info
import dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT || 3000;
const host = process.env.EXP_IP || '0.0.0.0';
// start the server
app.listen(port, host, () => console.log(`Listening on http://${host}:${port}`))
