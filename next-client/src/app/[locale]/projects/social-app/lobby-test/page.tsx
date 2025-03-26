"use client"
import { useState } from 'react';
import { useTranslations } from "next-intl";
import { ChatMessage, Game, Player } from '../state';
import { useRouter } from 'next/navigation';
import { Chat } from '../lobby/Chat';
import { HashMap } from '../deprecated_utils';
import { v4 as uuidv4 } from 'uuid'; 
import { GameCreation } from '../lobby/GameCreation';

const ME = "test_user1";
const TEST_GAMES = new HashMap([
  ["testgame", { id: "testgame", name: "Test Game", playerCount: 5, timer: 50000, timeCreated: new Date().getTime() / 1000 }],
]);
const TEST_PLAYERS = new HashMap<Player>([
  [ME, { username: ME, picUrl: null, status: 'ACTIVE' }],
  ["userWithReallyLongName", { username: "userWithReallyLongName", picUrl: null, status: 'IDLE' }],
]);

export default function LobbyTest() {
  const t = useTranslations('');
  const nav = useRouter();

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [gameList] = useState<HashMap<Game>>(TEST_GAMES);
  const [players] = useState<HashMap<Player>>(TEST_PLAYERS);
  const [sendText, setSendText] = useState("");

  const handleSendMessage = () => {
    const newMsg = {
      id: uuidv4(),
      username: ME,
      timestamp: new Date().toDateString(),
      text: sendText,
    };
    setChatMessages((msgs) => [...msgs, newMsg]);
    setSendText("");
  }

  return (
    <section className="flex relative h-full w-full justify-center">
      <div className="flex h-[80vh] w-[100vw] md:w-[80vw] mt-5">
        <GameCreation
          gameList={gameList}
          onCreateGame={() => {}}
          onJoinGame={() => {}}
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
    </section>
  )
}