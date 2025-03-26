import React, { useEffect, useRef, useState } from 'react';
import { offsetFromParent, polarToCartesian } from '@/lib/utils';
import { PlayerStatus } from '../../state';

type Props = {
  picUrl: string;
  status: PlayerStatus;
  className?: string;
}

type Coords = {
  x: number;
  y: number;
}

  /* Function which calculates center coordinates of element, relative to
  *  the parent, and returns {numItems} coordinates which are positions,
  *  {inputSpread}*2*PI radians apart from each other around midTheta, around
  *  a circular circumference of {element}, with radius element.width/2.
  */
const getCoords = (element: HTMLImageElement, numItems: number, theta = 0.875, spread = 0.1) => {
  const returnCoords: Coords[] = [];

  // Obtain center of element & radius
  const x0 = offsetFromParent(element).x;
  const y0 = offsetFromParent(element).y;
  const height = element.height;
  const width = element.width;
  const originX = x0 + 0.5*width;
  const originY = y0 + 0.5*height;
  const radius = width/2;

  for(let i = 0; i < numItems; i++){
    const thetaI = (theta + spread*(i + 0.5*(1-numItems)))*2*Math.PI;
    const offsetCoords = polarToCartesian(thetaI, radius);
    returnCoords.push(
      {
        x: originX + offsetCoords.x,
        y: originY - offsetCoords.y
      });
  }

  return returnCoords;

}

const statusColorsMap: Record<PlayerStatus, string> = {
  ACTIVE: '#33cc33',
  IN_GAME: '#ee1111',
  IDLE: '#cccc22',
  DISCONNECTED: '#959595',
  OFFLINE: '#ffffff',
};

export const Avatar = (props: Props) => {
  const [coords, setCoords] = useState<Coords[]>([]);
  const avatarImg = useRef<HTMLImageElement>(null);

  const updateCoords = () => {
    if (avatarImg.current) {
      const coords = getCoords(avatarImg.current, 1);
      setCoords(coords);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", updateCoords);
    updateCoords();

    return () => {
      window.removeEventListener("resize", updateCoords);
    }
  }, [])

  return (
    <span className={props.className} style={{position: 'relative'}}>
      <img
        src={props.picUrl}
        style={{borderRadius: 100 + 'px'}}
        ref={avatarImg}
        height="30" width="30"/>
      <br/>
      {Boolean(coords && coords.length === 1) && (
        <div style={{
          position: 'absolute',
          top: coords[0].y - 6,
          left: coords[0].x - 6,
          borderWidth: 2 + 'px',
          borderStyle: 'solid',
          borderColor: '#2f3136',
          backgroundColor: statusColorsMap[props.status],
          borderRadius: 50 + '%',
          height: 13 + 'px',
          width: 13 + 'px'
        }}/>
      )}
    </span>
  );
}