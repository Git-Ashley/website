"use client"
import { Suspense, use, useCallback, useEffect, useState } from 'react';
import { useLocale, useTranslations } from "next-intl";
import { ChatMessage, Game, LobbyActions, LobbyContext, Player } from '../state';
import { Rooms, ClientRoom } from 'client-room';
import { WSEventTypes } from '../eventTypes';
import { HashMap, NODE_SOCIAL_URL, API_OPTIONS } from '../deprecated_utils';
import { ErrorDialog } from '../../../components/ErrorDialog';
import { Chat } from './Chat';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GameCreation } from './GameCreation';
import { useRouter } from '@/src/i18n/routing';
import { Placeholder } from '../../project-placeholder';
import LobbyError from './error';

export default function Lobby() {
  const t = useTranslations('');
  const locale = useLocale();
  const nav = useRouter();
  const [serverIsDown, setServerIsDown] = useState(false);
  const {
    state: {
      roomId,
      chatMessages,
      gameList,
      players,
    },
    dispatch,
  } = use(LobbyContext);

  const [room, setRoom] = useState<any>(null);

  const [isDisconnected, setIsDisconnected] = useState(false);

  const [loading, setLoading] = useState(true);
  const [sendText, setSendText] = useState("");

  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [username, setUsername] = useState("");
  const [loginError, setLoginError] = useState<any>(null);

  useEffect(() => {
    let roomCheck = null;
    if(roomId) // Then the room should already have been setup
      roomCheck = Rooms.get(roomId);

    if(!roomCheck){
      if(roomId)
        console.log('ERROR! roomId set in props, but room not found in Room pool');

      const newRoom = new ClientRoom({ wsUrl: NODE_SOCIAL_URL });
      setRoom(newRoom);
      init(newRoom);
    } else {
      console.log('already joined lobby... unpausing...');
      setRoom(roomCheck);
      dispatch({ type: LobbyActions.JOINED_LOBBY, roomId: roomCheck.id })
      setLoading(false);
    }
  }, [])

  const init = useCallback((newRoom: any) => {
    if (!newRoom) return;

    newRoom.on(WSEventTypes.CHAT_MESSAGE_RECEIVED,
      function(message: ChatMessage){ dispatch({ type: LobbyActions.ADD_MESSAGE, message }); });
    newRoom.on(WSEventTypes.PLAYER_JOINED,
      function(player: Player){ dispatch({ type: LobbyActions.ADD_PLAYER, player }); });
    newRoom.on(WSEventTypes.PLAYER_LEFT,
      function(username: string){ dispatch({ type: LobbyActions.SET_PLAYER_OFFLINE, username }); });
    newRoom.on(WSEventTypes.PLAYER_JOINED_GAME,
      function({player, game}: { readonly player: Player; readonly game: Game; }){
        dispatch({type: LobbyActions.UPDATE_PLAYER, player});
        dispatch({type: LobbyActions.UPDATE_GAME, game});
      });
    newRoom.on(WSEventTypes.UPDATE_GAME,
      function(game: Game){ dispatch({ type: LobbyActions.UPDATE_GAME, game }); });
    newRoom.on(WSEventTypes.UPDATE_PLAYER,
      function(player: Player){ dispatch({ type: LobbyActions.UPDATE_PLAYER, player }); });
    newRoom.on(WSEventTypes.ADD_GAME,
      function(game: Game){ dispatch({ type: LobbyActions.ADD_GAME, game }); });
    newRoom.on(WSEventTypes.GAME_ENDED,
      function(game: Game){ dispatch({ type: LobbyActions.REMOVE_GAME, game }); });
    
    const populateLobby = function(res: {
      readonly players: [string, Player][]; readonly gameList: [string, Game][]; }
    ){
      const players = new HashMap<Player>(res.players);
      const gameList = new HashMap<Game>(res.gameList);
      dispatch({ type: LobbyActions.SET_PLAYERS, players });
      dispatch({ type: LobbyActions.SET_GAMES, games: gameList });
      setLoading(false);
    }
    newRoom.on('START', populateLobby);
    newRoom.on('RESUME', populateLobby);

    newRoom.on('disconnect', function(){
      setIsDisconnected(true);
    });
    newRoom.on('reconnect', function(){
      setIsDisconnected(false);
    });

    newRoom.join(`${NODE_SOCIAL_URL}/socialapp/lobby/join`, undefined, API_OPTIONS).then(() => 
      Promise.all([
        // Simulate loading of assets, etc, before notifying server we are initialized.
        new Promise(resolve => {
          newRoom.on('connect', () => {
            console.log('connECted.')
            resolve(true);
          });
        }),
        /*new Promise(resolve => {
          Simulate fetching data, etc.
          setTimeout(resolve, 1000);
        })*/
      ])
    ).then(() => {
      newRoom.emit('CLIENT_INITIALIZED'); // Used with RoomWithInitialization
      dispatch({ type: LobbyActions.JOINED_LOBBY, roomId: newRoom.id })
    }).catch((err: unknown) => {
      console.log(`Cannot auto join lobby`, err);
      if (String(err).includes("TypeError")) {
        // Network error
        return setServerIsDown(true);
      }
      setShowLoginDialog(true);
    });
  }, [])

  const handleCreateGame = (options: { readonly name: string }) => {
    console.log('options: ' + JSON.stringify(options));
    room.emit(WSEventTypes.CREATE_GAME, options);
  }

  const handleSendMessage = () => {
    room.emit('SEND_MESSAGE', sendText);
    setSendText("");
  }

  const handleJoinGame = (id: string) => {
    const gameRoom = new ClientRoom({ wsUrl: NODE_SOCIAL_URL });
    console.log(`Attempting to join game ${id}`);
    gameRoom.join(`${NODE_SOCIAL_URL}/socialapp/joingame/${id}`, undefined, API_OPTIONS)
      .then(() => {
        console.log('join game success');
        dispatch({ type: LobbyActions.JOINED_GAME, gameRoom });
        nav.push(
          { pathname: "/projects/social-app/node-shooter", query: { gameId: id } },
          { locale },
        );
      })
      .catch((err: unknown) => {
        console.log(`Error while trying to join socialapp/joingame: ${err}`);
        //TODO Popup dialog error.
      });
  }

  const handleLobbyLogin = (name: string) => {
    room.join(`${NODE_SOCIAL_URL}/socialapp/lobby/login`, { username: name }, API_OPTIONS).then(() => 
      Promise.all([
        new Promise(resolve => {
          room.on('connect', () => {
            console.log('connected.')
            resolve(true);
          });
        }),
        new Promise(resolve => {
          // Simulate loading of assets, etc, before notifying server we are initialized.
          setTimeout(resolve, 1000);
        })
      ])
    ).then(() => {
      room.emit('CLIENT_INITIALIZED'); // Used with RoomWithInitialization
      dispatch({ type: LobbyActions.JOINED_LOBBY, roomId: room.id })
      setShowLoginDialog(false);
      setLoginError(null);
    }).catch((err: unknown) => {
      setLoginError(err);
    });
  }

  if (serverIsDown) {
    return <LobbyError />
  }

  return (
    <Suspense fallback={<Placeholder/>}>
      <section className="flex relative h-full w-full justify-center">
        <ErrorDialog open={isDisconnected} />
        <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Choose name</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Name
                </Label>
                <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              {!!loginError && <div className="text-red-500 my-2">{loginError}</div>}
              <Button type="button" onClick={() => handleLobbyLogin(username)}>Submit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {loading ?
          <div>Loading lobby...</div> :
          <div className="flex h-[80vh] w-[100vw] md:w-[80vw] mt-5">
            <GameCreation gameList={gameList}
              onCreateGame={handleCreateGame}
              onJoinGame={handleJoinGame}
            />
            <div style={{flex: 5}}>
              <Chat
                players={players}
                chatMessages={chatMessages}
                onSendMessage={handleSendMessage}
                onSendTextChange={(e) => setSendText(e.target.value)}
                sendText={sendText}
              />
            </div>
          </div>
        }
      </section>
    </Suspense>
  )
}