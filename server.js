'use strict';

const fs = require('fs');
const path = require('path');
const promisify = require('bluebird').promisify; // eslint-disable-line import/no-extraneous-dependencies
const adaro = require('adaro'); // eslint-disable-line import/no-extraneous-dependencies
const express = require('express'); // eslint-disable-line import/no-extraneous-dependencies

const readFile = promisify(fs.readFile);

const app = express();

app.engine('dust', adaro.dust());
app.set('view engine', 'dust');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.static('node_modules/carbon-components/css'));
app.use(express.static('node_modules/@webcomponents/custom-elements'));
app.use(express.static('public'));

// eslint-disable-next-line prefer-arrow-callback
app.get('/', function topRoute(req, res) {
  res.status(404).send('Status 404');
});

// eslint-disable-next-line prefer-arrow-callback
app.get('/components/:component', function componentRoute(req, res) {
  const contentPath = `views/${req.params.component}.html`;
  if (path.relative('views', contentPath).substr(0, 2) === '..') {
    // eslint-disable-next-line no-console
    console.warn('Parent directory of views is requested.');
    res.status(404).send('Status 404');
  } else {
    readFile(contentPath, 'utf8')
      .then((content) => {
        if (!content) {
          res.status(404).send('Status 404');
        } else {
          res.render('index', { content });
        }
      })
      .catch((error) => {
        console.error(error.stack); // eslint-disable-line no-console
        res.status(500).send('Status 500');
      });
  }
});

const port = process.env.PORT || 8080;
module.exports = app.listen(port);
console.log(`Server started listening port ${port}.`); // eslint-disable-line no-console
