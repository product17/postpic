'use strict';

/**
 * Module dependencies.
 */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const compress = require('compression');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const passport = require('passport');
const glob = require('glob');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const config = require('./config');
const path = require('path');

module.exports = function runApp() {
  // Initialize express app
  const app = express();

  app.set('port', config.port);

  // Globbing model files
  glob('./lib/**/*.model.js', { sync: true }).forEach((modelPath) => {
    console.log(modelPath)
    require(path.resolve(modelPath));
  });

  // Setting application local variables
  // app.locals.title = config.app.title;
  // app.locals.description = config.app.description;
  // app.locals.keywords = config.app.keywords;
  // app.locals.facebookAppId = config.facebook.clientID;
  // app.locals.jsFiles = config.getJavaScriptAssets();
  // app.locals.cssFiles = config.getCSSAssets();

  // Passing the request url to environment locals
  app.use((req, res, next) => {
    res.locals.url = '${req.protocol}://${req.headers.host}${req.url}';
    next();
  });

  // Should be placed before express.static
  app.use(compress({
    filter: function filter(req, res) {
      return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    level: 9,
  }));

    // Showing stack errors
  app.set('showStackError', true);

    // view engine setup
  app.set('view engine', 'jade');
  app.set('views', path.join(__dirname, '../app/views'));

  // Environment dependent middleware
  if (process.env.NODE_ENV === 'development') {
    // Enable logger (morgan)
    app.use(morgan('dev'));

    // Disable views cache
    app.set('view cache', false);
  } else if (process.env.NODE_ENV === 'production') {
    app.locals.cache = 'memory';
  }

  // Request body parsing middleware should be above methodOverride
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  // CookieParser should be above session
  app.use(cookieParser());

  // Express MongoDB session storage
  app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: config.sessionSecret,
    cookie: {
      secure: 'auto',
      maxAge: 2628000000,
    },
    store: new MongoStore({
      url: config.app.db_path,
    }),
  }));

  // use passport session
  app.use(passport.initialize());
  app.use(passport.session());

  // connect flash for flash messages
  app.use(flash());

  // Use helmet to secure Express headers
  app.use(helmet.xframe());
  app.use(helmet.xssFilter());
  app.use(helmet.nosniff());
  app.use(helmet.ienoopen());
  app.disable('x-powered-by');

  // Setting the app router and static folder
  app.use('/public', express.static(path.join(__dirname, '../public')));

  // Routes need to be included before Error handling
  app.use(require('../routes'));

  // Assume 'not found' in the error msgs is a 404.
  // This is somewhat silly, but valid, you can do
  // whatever you like, set properties, use instanceof etc.
  app.use((err, req, res, next) => {
    // If the error object doesn't exists
    if (!err) {
      return next();
    }

    // Log it
    console.error(err.stack);

    // Error page
    res.status(500).render('error', {
      error: err.stack,
      url: req.originalUrl,
      status: 500,
    });
  });

  // Assume 404 since no middleware responded
  app.use((req, res) => {
    res.status(404).render('error', {
      url: req.originalUrl,
      error: 'Not Found',
      satus: 404,
    });
  });

  // if (process.env.NODE_ENV === 'secure') {
  // 	// Log SSL usage
  // 	console.log('Securely using https protocol');
  //
  // 	// Load SSL key and certificate
  // 	var privateKey = fs.readFileSync('./config/sslcerts/key.pem', 'utf8');
  // 	var certificate = fs.readFileSync('./config/sslcerts/cert.pem', 'utf8');
  //
  // 	// Create HTTPS Server
  // 	var httpsServer = https.createServer({
  // 		key: privateKey,
  // 		cert: certificate
  // 	}, app);
  //
  // 	// Return HTTPS server instance
  // 	return httpsServer;
  // }

  // Return Express server instance
  return app;
};
