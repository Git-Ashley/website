const Room = require('server-room');

// Base class for all games
module.exports = class Game extends Room.WithReadyCheck {

  constructor(ops){
    super(ops);

    let name = "Untitled Game";
    if(ops.name)
      name = ops.name;
    else if (ops.author)
      name = `${ops.author}'s Game`;

    this._name = name;
    this._author = ops.author;
    this._playerCount = 0;
    this._timeCreated = new Date().getTime() / 1000;
    if(ops.timer)
      this._timer = ops.timer/1000;
    else
      this._timer = null;

    //It is only expected for the lobby to need to listen to these events for now
    //so only allow a single listener to prevent accidental memory leak
    this._onPlayerLeaveListener = () => {};
    this._onPlayerJoinListener = () => {};
    this._onEndListener = () => {};

    if(typeof ops.timer === 'number' && ops.timer > 0)
      setTimeout(() => this._onEndListener(), ops.timer);

  }

  get name(){
    return this._name;
  }

  get stats(){
    return {
      id: this.id,
      name: this.name,
      playerCount: this._playerCount,
      timer: this._timer,
      timeCreated: this._timeCreated
    };
  }

  get playerCount(){
    return this._playerCount;
  }

  onPlayerLeave(listener){
    this._onPlayerLeaveListener = listener;
  }

  onPlayerJoin(listener){
    this._onPlayerJoinListener = listener;
  }

  onEnd(listener){
    this._onEndListener = listener;
  }

  onClientLeave(client){
    super.onClientLeave(client);
    this._playerCount = this._clients.size;
    this._onPlayerLeaveListener(client, this.stats);
  }

  onClientDisconnect(client){
    super.onClientDisconnect(client);
    this._playerCount = this._clients.size;
    this._onPlayerLeaveListener(client, this.stats);
  }

  onClientAccepted(client){
    super.onClientAccepted(client);
    this._playerCount = this._clients.size;
    this._onPlayerJoinListener(client, this.stats);
  }
}
