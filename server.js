var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config');
var bodyParser = require("body-parser");
var router = require("./router");
var app = express();
var cors = require('cors');
var compiler = webpack(config);
const mongoose = require('mongoose');
var PORT = process.env.PORT || 3000

app.use(cors());
app.use('/static', express.static(__dirname + '/static'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://admin:password@ds046939.mlab.com:46939/users");
var Score = require("./models/score");

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

// Route for application
app.get('/', function(request, response) {
  response.render('index')
});

// Route Handling for server side
router(app);

app.listen(PORT, function(err) {
  if (err) {
    return console.error(err);
  }

  console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});
