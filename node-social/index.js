const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
var cors = require('cors');

const port = 4435;

const app = express();

// 3. room.emit('CLIENT_INITIALIZED'); on FE should be room.initialized();

// ?. Update all packages & decide which ones I need.


//production stuff: helmet for extra security
/*app.use(helmet({
  ieNoOpen: false,
  dnsPrefetchControl: false
}));*/


/* ROUTE 53 METHOD
app.set('trust proxy', 1);
const sessionMiddleware = session({
    secret: 'dogjdsoijqE4rt89q3ur4rt£W$T*IQfiaf83q489rth8y',
    saveUninitialized: true,
	  resave: false,
    //store: new MongoStore({url: mongoUrl})
    cookie: {
      sameSite: 'strict',
      //secure: true,
    },
});
*/


// api-gateway and nextjs cloudfront

const sessionMiddleware = session({
    secret: 'dogjdsoijqE4rt89q3ur4rt£W$T*IQfiaf83q489rth8y',
    saveUninitialized: true,
	  resave: false,
    //store: new MongoStore({url: mongoUrl})
    /*cookie: { // NO SET-COOKIE BEING SENT AT ALL.
      sameSite: 'none',
      secure: true,
    },*/
});


app.use(sessionMiddleware);

app.use(cors({
  origin: ["http://localhost:3000","https://www.ashphillips.ca"],
  credentials: true,
}))
const server = require('http').createServer(app);

// api setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(flash());
require('./node-social.js')(app, server);
app.options('*', (_, res) => {
  return res.status(200).end();
});
// Health check endpoint
app.get('/health', (_, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});
app.get('/healthcheck', (_, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

app.get('*', (_, res) => {
  console.log('Request not found.')
  res.status(404).end();
})
app.post('*', (_, res) => {
  console.log('Request not found.')
  res.status(404).end();
})

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
