const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { startServer } = require('./utils');
const authRouter = require('./routers/authRouter');

const port = process.env.PORT || 5000;
const dbPath = process.env.DBPATH;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CLIENT_HOST }));
app.use('/auth', authRouter);

startServer(dbPath, mongoose, app, port);
