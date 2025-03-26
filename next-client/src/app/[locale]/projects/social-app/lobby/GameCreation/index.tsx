"use client"
import React, { useState } from 'react';
import styles from './styles.module.css';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { HashMap } from '../../deprecated_utils';
import type { Game } from '../../state';
import { GameStats } from './GameStats';

type Props = {
  readonly gameList: HashMap<Game>;
  onCreateGame: (ops: { readonly name: string }) => void;
  onJoinGame: (id: string) => void;
};

export const GameCreation = (props: Props) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [name, setName] = useState("");

  const handleCreateGame = () => {
    props.onCreateGame({ name });
    setShowCreateDialog(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Game List</div>
      <div style={{flex: 5}}>
        {props.gameList.map(game => <GameStats key={game.id} game={game} onJoin={props.onJoinGame} />)}
      </div>
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Game</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleCreateGame}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className={`${styles.greenBtn} ${styles.createButton}`} onClick={() => setShowCreateDialog(true)}>
        Create Game
      </div>
    </div>
  );
}