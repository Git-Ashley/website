const Room = require('server-room');
const EventTypes = require('../event-types.js');
const LobbyPlayer = require('./lobby-player.js');
const NodeShooter = require('../node-shooter.js');

const MAX_GAMES = 5;
const DEFAULT_TIME = 300000;

module.exports = class Lobby extends Room.WithReadyCheck {
  constructor(){
    super({reconnectTimeout: 30000});

    this._lobbyPlayers = new Map();
    this._gameList = new Map();
    this.setupGame({name: "Test Game", author: "Server"});
  }

  onClientAccepted(client, userInfo){
    super.onClientAccepted(client);
    const newLobbyPlayer = new LobbyPlayer({client, picUrl: userInfo.picUrl, username: userInfo.id});
    this._lobbyPlayers.set(client.id, newLobbyPlayer);
  }

  getGame(id){
    return this._gameList.get(id);
  }

  //Overidden to recognise paused players
  broadcast(event, payload){
    for(let [username, player] of this._lobbyPlayers){
      if(player.status === LobbyPlayer.States.ACTIVE)
        this.emit(player.client, event, payload);
    }
  }

  onJoinRequest(userInfo){
    const id = userInfo.id;
    if(!id)
      return {success: false, error: {message: 'ID not defined'}, reason: 'Error occurred'};

    if(this._lobbyPlayers.get(id))
      return {success: false, reason: `User ${id} already in room`};

    return {success: true};
  }

  onClientLeave(client){
    super.onClientLeave(client);
    this._lobbyPlayers.delete(client.id);
    this.broadcast(EventTypes.PLAYER_LEFT, client.id);
  }

  onClientDisconnect(client){
    super.onClientDisconnect(client);
    const player = this._lobbyPlayers.get(client.id);
    if(player){
      player.status = LobbyPlayer.States.DISCONNECTED;
      this.broadcast(EventTypes.UPDATE_PLAYER, player.profile);
    }
  }

  onClientReconnectReady(client){
    const player = this._lobbyPlayers.get(client.id);
    if(player){
      player.status = LobbyPlayer.States.ACTIVE;
      this.broadcast(EventTypes.UPDATE_PLAYER, player.profile);
    }
    //TODO send back all messages data from the time of first onClientReady. (up to 100)
    //Stuff will need sortign first with messages...
    this.sendAllData(client, 'RESUME');
  }

  setupGame(options = {}){
    const nodeShooterInstance  = new NodeShooter(options);
    nodeShooterInstance.onPlayerLeave((client, updatedGameStats) => {
      const player = this._lobbyPlayers.get(client.id);
      if(player){
        player.status = this.isConnected(client) ? LobbyPlayer.States.ACTIVE : LobbyPlayer.States.DISCONNECTED;
        this.broadcast(EventTypes.UPDATE_PLAYER, player.profile);
        this.broadcast(EventTypes.UPDATE_GAME, updatedGameStats);
        this.sendAllData(client, 'RESUME');
      } else {
        console.log(`Error: tried to remove client ${client.id} from lobby, but not found`);
      }
    });
    nodeShooterInstance.onPlayerJoin((client, updatedGameStats) => {
      const player = this._lobbyPlayers.get(client.id);
      if(player){
        player.status = LobbyPlayer.States.IN_GAME;
        this.broadcast(EventTypes.PLAYER_JOINED_GAME, {player:player.profile, game:updatedGameStats});
      }
    });
    nodeShooterInstance.onEnd(() => {
      this._gameList.delete(nodeShooterInstance.id);
      this.broadcast(EventTypes.GAME_ENDED, nodeShooterInstance.stats);
    });
    this._gameList.set(nodeShooterInstance.id, nodeShooterInstance);
    return nodeShooterInstance;
  }

  onClientReady(client){
    const player = this._lobbyPlayers.get(client.id);
    this.addListener(client, EventTypes.SEND_MESSAGE, msg => {
      const randomStr = require('../utils/random-string.js')();

      const message = {
        timestamp: "",  //TODO to be implemented
        group: "", //TODO to be implemented
        username: player.username,
        id: `${player.username}|${randomStr}`,
        text: msg
      };
      this.broadcast(EventTypes.CHAT_MESSAGE_RECEIVED, message);
    });

    this.addListener(client, EventTypes.CREATE_GAME, options => {

      //validation
      if(this._gameList.size >= MAX_GAMES)
        return res({error: "Cannot create anymore games. Server limit reached."});

      console.log(`Creating game ${(options && options.name) || "Untitled"} by ${client.id}`);
      options.author = player.username;
      options.timer = DEFAULT_TIME;

      const newGame = this.setupGame(options);
      this.broadcast(EventTypes.ADD_GAME, newGame.stats);
      //clientCallback({success: true});
    });

    player.status = LobbyPlayer.States.ACTIVE;
    this.broadcast(EventTypes.PLAYER_JOINED, player.profile);
    this.sendAllData(client, 'START');
  }

  sendAllData(client, eventType){
    const gameListData = [];
    for(let [id, game] of this._gameList)
      gameListData.push([id, game.stats]);
    const playerData = [];
    for(let [username, player] of this._lobbyPlayers)
      playerData.push([username, player.profile]);

    this.emit(client, eventType, {gameList: gameListData, players: playerData});
  }
}
