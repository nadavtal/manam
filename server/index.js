/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const logger = require('./logger');
const config = require('./config.js');
const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');

// var bunyan = require('bunyan');
// var Bunyan2Loggly = require('bunyan-loggly');
// var logglyConfig = {
//     token: '0618ff18-790c-4018-8063-1e36ba16d8d8',
//     subdomain: 'nadavalmagor',
// };
 
// var logglyStream = new Bunyan2Loggly(logglyConfig);
 
// create the logger
// var bunyanLogger = bunyan.createLogger({
//     name: 'khkhkhkhkhkhkh',
//     streams: [
//         {
//             type: 'raw',
//             stream: logglyStream,
//         },
//     ],
// });
// var bunyanLogger = bunyan.createLogger({
//   name: 'myapp',
//   streams: [
//     {
//       level: 'info',
//       stream: process.stdout            // log INFO and above to stdout
//     },
//     {
//       level: 'error',
//       path: '/var/tmp/myapp-error.log'  // log ERROR and above to a file
//     }
//   ]
// });
// // console.log('bunyanLogger', bunyanLogger)
// bunyanLogger.info({
//   logType: 'user signed in'
// });
// bunyanLogger.warn({lang: 'en'}, 'ENGLISHHHHHH');
// // bunyanLogger.info('hi %s', bob, anotherVar); // Uses `util.format` for msg formatting

// function Wuzzle(options) {
//   this.bunyanLogger = options.log.child({widget_type: 'wuzzle'});
//   this.bunyanLogger.info('creating a wuzzle')
// }
// Wuzzle.prototype.woos = function () {
//   this.bunyanLogger.warn('This wuzzle is woosey.')
// }

// bunyanLogger.info('start');
// var wuzzle = new Wuzzle({log: bunyanLogger});
// wuzzle.woos();
// bunyanLogger.info('done');


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
var organizationUsersRoutes = require('./routes/organization-users');
var projectSurveysRoutes = require('./routes/project-surveys');
var messages = require('./routes/messages');
var processTemaplateTasksRoutes = require('./routes/process-template-tasks');
var processesRoutes = require('./routes/processes');
var tasksRoutes = require('./routes/tasks');
var emailsRoutes = require('./routes/emails');
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(config.apiRoute, [routes, orgRoutes, userRoutes, providersRoutes, projectsRoutes, bridgesRoutes, surveysRoutes, projectUsersRoutes, projectSurveysRoutes,
                          providerUsersRoutes, messages, processTemaplateTasksRoutes, rolesRoutes, processesRoutes, tasksRoutes, emailsRoutes, organizationUsersRoutes]);




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





