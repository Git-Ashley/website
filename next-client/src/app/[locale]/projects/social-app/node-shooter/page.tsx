"use client"
import NodeShooter from './NodeShooter';
//import { useSearchParams } from "next/navigation";
import { use, useEffect } from "react";
import { useRouter } from "@/src/i18n/routing";
import { LobbyActions, LobbyContext } from '../state';
import { Button } from '@/components/ui/button';

export default function NodeShooterGame() {
  //const t = useTranslations('');

  // Needs to be wrapped in suspense:
  //const searchParams = useSearchParams();
  //const gameId = searchParams.get('gameId');
  const router = useRouter();
  const {
    state: { gameRoom },
    dispatch,
  } = use(LobbyContext);

  useEffect(() => {
    const instance = NodeShooter()(gameRoom);
    if (instance)
      dispatch({ type: LobbyActions.JOINED_NODESHOOTER, gameInstance: instance });
    gameRoom.emit('CLIENT_INITIALIZED');
  }, [])

  return (
    <div>
      <div>
        <Button type="button" onClick={router.back}>Leave</Button>
      </div>
      <canvas id="node-shooter" height="800" width="800" style={{borderStyle: 'solid', borderWidth: 5 + 'px'}} />
    </div>
  )
}