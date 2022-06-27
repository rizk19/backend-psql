/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

routes(app);
