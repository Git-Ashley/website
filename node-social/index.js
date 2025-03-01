const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

const port = 4435;

const app = express();



// 1. Investigate wtf is going on with session store. Do I NEED one?
// 2. Kill self if no users for more than 60 seconds.

// ?. Update all packages & decide which ones I need.


//production stuff: helmet for extra security
app.use(helmet({
  ieNoOpen: false,
  dnsPrefetchControl: false
}));

const sessionMiddleware = session({
    secret: 'dogjdsoijqE4rt89q3ur4rt£W$T*IQfiaf83q489rth8y',
    saveUninitialized: false,
	  resave: false,
    secure: true,
    //store: new MongoStore({url: mongoUrl})
});

app.use(sessionMiddleware);
const server = require('http').createServer(app);

// api setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(flash());
require('./node-social.js')(app, server);

// start server
server.listen(port, (err) => {
  if(err){
    console.error(err);
    process.exit(1);
  } else {
    console.log('Listening on port: ' + port + ' (http)');
    if(process.env.NODE_ENV !== "production")
      console.log("Running in development mode");
    else
      console.log("Running in production mode");
  }
});