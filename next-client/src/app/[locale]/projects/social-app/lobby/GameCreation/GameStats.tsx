"use client"

import { useEffect, useState } from "react";
import { Game } from "../../state";
import styles from "./styles.module.css";

function timeStr({ timeCreated, timer }: Game) {
  if(!timer)
    return '∞';

  const currentTime = new Date().getTime() / 1000;
  const elapsedTime = Math.floor(currentTime - timeCreated);

  let timeLeft = timer - elapsedTime;
  if(timeLeft < 0)
    timeLeft = 0;

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  // hh:mm:ss
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return formattedTime;
}

type Props = {
  readonly game: Game;
  onJoin: (id: string) => void;
}

export const GameStats = ({ game, onJoin }: Props) => {
  const [timer, setTimer] = useState(timeStr(game));

  useEffect(() => {
    if(!game.timer || !game.timeCreated)
      return;
    const intervalId = setInterval(()=>{
      const newTimer = timeStr(game);
      setTimer(newTimer);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    }
  }, [])
  return (<div className={`${styles.gameWrap} text-center`}>
    <div className={styles.gameName}>{game.name}</div>
    <div>players: {game.playerCount}</div>
    <div>{timer}</div>
    <div className={styles.greenBtn} onClick={() => onJoin(game.id)}>Join</div>
  </div>);
}