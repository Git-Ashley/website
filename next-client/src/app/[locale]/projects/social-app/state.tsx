"use client"
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { HashMap } from "./deprecated_utils";

export const UserContext = createContext("");

export interface Game extends Record<string, unknown> {
  id: string;
  name: string;
  playerCount: number;
  timer?: number;
  timeCreated: number;
}

export type PlayerStatus = 'ACTIVE' | 'IN_GAME' | 'IDLE' | 'OFFLINE' | 'DISCONNECTED';

export interface Player extends Record<string, unknown> {
  status: PlayerStatus;
  username: string;
  picUrl: string | null;
}

export interface ChatMessage {
  id: string;
  username: string;
  timestamp: string;
  text: string;
}

interface Lobby {
  chatMessages: ChatMessage[];
  players: HashMap<Player>;
  gameList: HashMap<Game>;
  roomId: null | string;
  gameRoom: any | null;
  gameInstance: any | null;
}

const lobbyInitialState: Lobby = {
  chatMessages: [],
  players: new HashMap(),
  gameList: new HashMap(),
  roomId: null,
  gameRoom: null,
  gameInstance: null,
}

export const LobbyContext = createContext({ state: lobbyInitialState, dispatch: (_: LobbyAction) => {} });

export enum LobbyActions {
  SEND_MESSAGE_ERROR, // 0
  ADD_MESSAGE, // 1
  ADD_PLAYER, // 2
  SET_PLAYERS, // 3
  REMOVE_PLAYERS, // 4
  SET_PLAYER_OFFLINE, // 5
  UPDATE_PLAYER, // 6
  ADD_GAME, // 7
  SET_GAMES, // 8
  REMOVE_GAME, // 9
  UPDATE_GAME, // 10
  JOINED_LOBBY, // 11
  JOINED_GAME, // 12
  JOINED_NODESHOOTER, // 13
}

type LobbyAction =
  { type: LobbyActions.ADD_MESSAGE; message: ChatMessage; }
  | { type: LobbyActions.SEND_MESSAGE_ERROR; }
  | { type: LobbyActions.ADD_PLAYER; player: Player; }
  | { type: LobbyActions.SET_PLAYERS; players: HashMap<Player>; }
  | { type: LobbyActions.REMOVE_PLAYERS; usernames: string[]; }
  | { type: LobbyActions.SET_PLAYER_OFFLINE; username: string; }
  | { type: LobbyActions.UPDATE_PLAYER; player: Player; }
  | { type: LobbyActions.SET_GAMES; games: HashMap<Game>; }
  | { type: LobbyActions.REMOVE_GAME; game: Game; }
  | { type: LobbyActions.ADD_GAME; game: Game; }
  | { type: LobbyActions.UPDATE_GAME; game: Game; }
  | { type: LobbyActions.JOINED_LOBBY; roomId: string; }
  | { type: LobbyActions.JOINED_GAME; gameRoom: any; }
  | { type: LobbyActions.JOINED_NODESHOOTER; gameInstance: any; }

// This was ripped out of an old project that used redux and can't be bothered to re-write
function lobbyReducer(state: Lobby, action: LobbyAction) {

  console.log('ACTION:', action.type);
  switch(action.type){
    case LobbyActions.ADD_MESSAGE:
      console.log('state.chatmessages:', state.chatMessages)
      return { chatMessages: [...state.chatMessages, action.message] };

    case LobbyActions.SEND_MESSAGE_ERROR:
      //TODO implement
      console.log('SEND_MESSAGE_ERROR');
      return null;

    case LobbyActions.ADD_PLAYER:
      const newPlayers = new HashMap(state.players);
      newPlayers.insert(action.player.username, action.player);
      const newState = { players: newPlayers };
      return newState;

    case LobbyActions.SET_PLAYERS:
      return { players: action.players };

    case LobbyActions.REMOVE_PLAYERS:
      const newPlayersRemoved = new HashMap(state.players);
      for(let username of action.usernames)
        newPlayersRemoved.remove(username);
      return { players: newPlayersRemoved };

    case LobbyActions.SET_PLAYER_OFFLINE:
      const newPlayersSetOffline = new HashMap(state.players);
      console.log(`username: ${action.username}. action: ${JSON.stringify(action)}`);
      const player = newPlayersSetOffline.get(action.username);
      if (player?.status) {
        player.status = 'OFFLINE';
      }
      return { players: newPlayersSetOffline };

    case LobbyActions.UPDATE_PLAYER:
      const newPlayersSetInGame = new HashMap(state.players);
      newPlayersSetInGame.insert(action.player.username, action.player);
      return { players: newPlayersSetInGame };

    case LobbyActions.UPDATE_GAME:
      const gameToUpdate = action.game;
      const gameListAfterUpdate = new HashMap(state.gameList);
      gameListAfterUpdate.insert(gameToUpdate.id, gameToUpdate);
      return { gameList: gameListAfterUpdate };

    case LobbyActions.ADD_GAME:
      const newGames = new HashMap(state.gameList);
      newGames.insert(action.game.id, action.game);
      return { gameList: newGames };

    case LobbyActions.SET_GAMES:
      return { gameList: action.games };

    case LobbyActions.REMOVE_GAME:
      const gameListPostRemoval = new HashMap(state.gameList);
      if(!(action.game && action.game.id)){
        console.log('Game or Game ID not found');
        return state;
      }
      gameListPostRemoval.remove(action.game.id);
      return { gameList: gameListPostRemoval };

    case LobbyActions.JOINED_LOBBY:
      if (state.gameRoom)
        state.gameRoom.leave();
      if (state.gameInstance)
        state.gameInstance.cleanup();
      return { roomId: action.roomId, gameRoom: null };
    
    case LobbyActions.JOINED_GAME:
      return { gameRoom: action.gameRoom };
    
    case LobbyActions.JOINED_NODESHOOTER:
      return { gameInstance: action.gameInstance };

    default:
      return null;
  }
}

export const LobbyProvider = ({ children }: { readonly children: ReactNode }) => {
  const [state, setLobbyData] = useState<Lobby>(lobbyInitialState);

  const dispatch = useCallback((action: LobbyAction) => {
    setLobbyData((lobbyState) => {
      const updatedLobbyData: Partial<Lobby> | null = lobbyReducer(lobbyState, action);

      if (!updatedLobbyData)
        return lobbyState;

      return { ...lobbyState, ...updatedLobbyData };
    });
  }, []);

  return (
    <LobbyContext.Provider value={{ state, dispatch }}>
      {children}
    </LobbyContext.Provider>
  );
}