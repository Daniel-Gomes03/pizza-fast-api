require("dotenv").config();

const express = require('express');
const morgan = require("morgan");
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect(process.env.MONGO_URL, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true}
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(require('./routes'));

app.listen(process.env.Port || 3000, () => {
  console.log('🚀 Back-end started')
});