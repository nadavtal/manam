/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const logger = require('./logger');
var config = require('./config.js');
const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');

const app = express();



/**
   * Router
   */
var routes = require('./app.routes.js');
var orgRoutes = require('./routes/organizations');
var userRoutes = require('./routes/users');
var providersRoutes = require('./routes/providers');
var projectsRoutes = require('./routes/projects');
var bridgesRoutes = require('./routes/bridges');
var rolesRoutes = require('./routes/roles');
var surveysRoutes = require('./routes/surveys');
var projectUsersRoutes = require('./routes/project-users');
var providerUsersRoutes = require('./routes/provider-users');
var projectSurveysRoutes = require('./routes/project-surveys');
var messages = require('./routes/messages');
var processTemaplateTasksRoutes = require('./routes/process-template-tasks');
var processesRoutes = require('./routes/processes');
var tasksRoutes = require('./routes/tasks');
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(config.apiRoute, [routes, orgRoutes, userRoutes, providersRoutes, projectsRoutes, bridgesRoutes, surveysRoutes, projectUsersRoutes, projectSurveysRoutes,
                          providerUsersRoutes, messages, processTemaplateTasksRoutes, rolesRoutes, processesRoutes, tasksRoutes]);




// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});


// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});





