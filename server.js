import React from 'react';
var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config');
import App from './src/App';
var ReactDOMServer = require('react-dom/server');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/image_builder_config.json', function(req, res) {
  res.sendFile(path.join(__dirname, 'image_builder_config.json'));
});

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('*', function(req, res) {
  const markup = `
  <!doctype html>
  <html>
    <head>
      <title>Sample App</title>
    </head>
    <body>
      <div id='root'>${ReactDOMServer.renderToString(<App />)}</div>
      <script src="/static/bundle.js"></script>
    </body>
  </html>
  `;
  res.send(markup);
});

app.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});
