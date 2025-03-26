const Lobby = require('./Lobby');
const Room = require('server-room');
const Users = require('./Users');

const ROUTE_PREFIX = '';
//const RESPONSE_URL = 'ws://localhost';
//const ROUTE_PREFIX = '/node-social';
const RESPONSE_URL = '';

const IP_HEADER = 'x-real-ip';
const SID_COOKIE = 'connect.sid';
//const SID_HEADER = 'Usersession';

function getSid(req) {
  return req.cookies[SID_COOKIE];
  //return req.get(SID_HEADER);
}

module.exports = function(app, server){

  const lobby = new Lobby();

  app.post(ROUTE_PREFIX + '/socialapp/joingame/:gameId', (req, res) => {
    const gameId = req.params.gameId;
    if(!gameId)
      return res.json({success:false, error:{message:'Game not found!'}});

    const gameInstance = lobby.getGame(gameId);
    if(!gameInstance)
      return res.json({success:false, error:{message:'player or game instance not found'}});

    const sid = getSid(req);
    //const user = req.user;
    const user = Users.get(sid);
    const ip = req.headers[IP_HEADER];
    if(!user)
      return req.status(401).end(); //Unauthorized

    const username = user.username;
    console.log(`${username} (${ip}) requested to join game`);
    const result = gameInstance.join({sid, ip, id: username});
    result.url = RESPONSE_URL;
    return res.json(result);
  });

  app.post(ROUTE_PREFIX + '/socialapp/lobby/login', (req, res) => {
    const sid = getSid(req);
    const requestedUsername = req.body.username;

    if (!requestedUsername
      || typeof requestedUsername !== 'string'
      || requestedUsername.length > 12
      || requestedUsername.length < 4) {
      return res.json({success:false, error:{message:'Username must be between 3 and 12 characters'}});
    }

    if ([...Users.values()].includes(requestedUsername)) {
      return res.json({success:false, error:{message:'Username already taken'}});
    }

    Users.set(sid, requestedUsername);
    const ip = req.headers[IP_HEADER];

    //const picUrl = user.displayPicture.value;
    const picUrl = null;
    console.log(`${requestedUsername} (${ip}) requested to join lobby`);
    console.log(`sid: ${sid}`);
    const result = lobby.join({sid, picUrl, ip, id: requestedUsername});
    result.url = RESPONSE_URL;
    return res.json(result);
  });

  app.post(ROUTE_PREFIX + '/socialapp/lobby/join', (req, res) => {
    const sid = getSid(req);
    //const user = req.user;
    const user = Users.get(sid);
    const ip = req.headers[IP_HEADER];
    if(!user)
      return res.status(403).end(); // Not logged in

    const username = user.username;
    //const picUrl = user.displayPicture.value;
    const picUrl = null;
    console.log(`${username} (${ip}) requested to join lobby`);
    console.log(`sid: ${sid}`);
    const result = lobby.join({sid, picUrl, ip, id: username});
    result.url = RESPONSE_URL;
    return res.json(result);
  });

  /*Websocket server*/
  //TODO move this into the client module; it is always going to be here.
  Room.initialize(server, {sidHeader: SID_COOKIE, ipHeader: IP_HEADER});
}
