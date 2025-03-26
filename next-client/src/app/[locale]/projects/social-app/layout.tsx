'use client';
import { LobbyProvider, UserContext } from "./state";
import { Rooms } from 'client-room';
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

/*
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for(let i = 0; i < 10; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
*/

export default function SocialApp({ children }: Props) {
  useEffect(() => () => {
    for(let [,room] of Rooms){
      room.leave();
      room._socket.close();
    }
  }, [])

  return (
    <LobbyProvider>
      <UserContext.Provider value={"Ash"}>
          {children}
      </UserContext.Provider>
    </LobbyProvider>
  )
}