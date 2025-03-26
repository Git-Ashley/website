"use client"
import React, { type ChangeEvent, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import { Avatar } from './Avatar';
import { HashMap } from '../../deprecated_utils';
import type { Player, ChatMessage as ChatMessageType } from '../../state';

const DEFAULT_PFP = "/images/generic-profile-pic.png";

interface ChatViewMessage extends Omit<ChatMessageType, 'text'> {
  text: string | string[];
}

const PlayerItem = ({ player }: { readonly player: Player }) => (
  <div className={styles.playerListItem}>
    <Avatar picUrl={player.picUrl || DEFAULT_PFP} className={styles.playerListAvatar} status={player.status}/>
    <span className="ml-2 mt-[5px] text-white font-bold truncate">{player.username}</span>
  </div>
);

const ChatMessage = ({ player, message }: { readonly player?: Player; readonly message: ChatViewMessage }) => (
  <div className={styles.messageContainer}>
    <img alt="profile pic" className={styles.messageImage}
      src={player?.picUrl || DEFAULT_PFP}/>
    <span>
      <span className={styles.messageUsername}>{player?.username || 'SERVER ANNOUNCEMENT'}</span>
      {
        Array.isArray(message.text) ?
          message.text.map((line, i) => <div key={`${message.id}${i}`}>{line}</div>)
          : <div>{message.text}</div>
      }
    </span>
  </div>
);

type Props = {
  players: HashMap<Player>;
  chatMessages: ChatMessageType[];
  onSendMessage: () => void;
  onSendTextChange: (e: ChangeEvent<HTMLInputElement>) => void;
  sendText: string;
};

export const Chat = (props: Props) => {
  const chatBody = useRef<HTMLDivElement>(null);
  let lastPoster = null;
  let chatMessages: ChatViewMessage[] = [];
  for(let msg of props.chatMessages){
    if(lastPoster === msg.username){
      let lastMsg = chatMessages.pop();
      let revisedMsg: ChatViewMessage | null = null;
      if(Array.isArray(lastMsg?.text)){
        lastMsg.text.push(msg.text);
        revisedMsg = lastMsg;
      } else {
        revisedMsg = Object.assign({}, lastMsg, {text: [lastMsg?.text, msg.text]});
      }
      chatMessages.push(revisedMsg);
    } else {
      chatMessages.push(msg);
    }
    lastPoster = msg.username;
  }

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
    } else {
      // do componentDidUpdate logic
      if (chatBody.current)
        chatBody.current.scrollTop = chatBody.current.scrollHeight - chatBody.current.clientHeight;
    }
  });

  return (
    <div className={styles.flexContainer}>
      <div className={styles.outputInputContainer}>
        <div className={`${styles.output} ${styles.dark1}`} ref={chatBody}>
          {
            chatMessages.map(msg => <ChatMessage key={msg.id} player={props.players.get(msg.username)} message={msg}/>)
          }
        </div>
        <span className={styles.sendForm}>
          <input type="text" className={styles.input} onKeyDown={e => {if(e.keyCode === 13) props.onSendMessage()}} onChange={props.onSendTextChange} value={props.sendText} />
          <span className={styles.btn} onClick={props.onSendMessage}>Send</span>
        </span>

      </div>
      <div className={`${styles.userList} ${styles.dark1}`} style={{position: 'relative'}}>
        {
          props.players.map(
            player => player.status !== 'OFFLINE' ? <PlayerItem key={player.username} player={player}/> : null
          )
        }
      </div>
    </div>
  );
}