"use client"
import React, { useEffect, useRef, useState } from 'react';
import { polarToCartesian, offsetFromParent, cn } from '@/lib/utils';
import { Github, Linkedin, Mail, MailOpen } from "lucide-react";
import Image from 'next/image';

type Coord = {x: number, y: number};

const icons = [
  {
    background: "bg-black hover:bg-[#656565] dark:bg-white dark:hover:[&>svg]:fill-[#777] dark:hover:[&>svg]:text-[#777]",
    link: "https://github.com/Git-Ashley?tab=repositories",
    Icon: Github,
    iconClass: "fill-background bottom-[1px] right-[2px] absolute text-background",
    size: 18,
  },
  {
    background: "bg-[#0a66c2] hover:bg-[#3b93ec]",
    link: "https://www.linkedin.com/in/ashley-p-5b5a8599/",
    Icon: Linkedin,
    iconClass: "text-white fill-white",
    size: 16,
  },
  {
    background: "bg-primary-40 group",
    link: "mailto:ashp1621@gmail.com",
    Icon: () => <div>
      <MailOpen className="fill-primary-40 text-white hidden group-hover:block absolute right-[3px] bottom-[4.5px]" size={17}/>
      <Mail className="fill-primary-40 text-white group-hover:hidden" size={17}/>
    </div>,
    iconClass: "",
    //size: 17,
  }
];

export const PhotoWidget = () => {
  const [coords, setCoords] = useState<Coord[]>([]);
  const imgEle = useRef<HTMLImageElement>(null);

  // Function which calculates center coordinates of element, relative to
  // the parent, and returns {numItems} coordinates which are positions,
  // {inputSpread}*2*PI radians apart from each other around midTheta, around
  // a circular circumference of {element}, with radius element.width/2.
  const getCoords = (element: HTMLImageElement, numItems: number, midTheta: number | null, inputSpread: number) => {
    const returnCoords: Coord[] = [];
    const theta = midTheta || 0.875; //Think of angle as a float from 0 -> 1
    const spread = inputSpread || 0.1; // i.e. symbols will be spaced a tenth of the circle apart if !inputSpread

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

  const updateCoords = () => {
    if (imgEle.current) {
      const newCoords = getCoords(imgEle.current, icons.length, null, 0.09);
      setCoords(newCoords);
    }
  }

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      window.addEventListener("resize", updateCoords);
      window.addEventListener("load", updateCoords);
      updateCoords();
      mounted.current = true;
    }

    return () => {
      window.removeEventListener("resize", updateCoords);
      window.removeEventListener("load", updateCoords);
    }
  });

  return (
    <div className="px-12 flex items-center">
      <Image
        height={150}
        width={150}
        alt="Photo of Ashley"
        ref={imgEle}
        src="/images/ashpic1.jpg"
        className="text-center rounded-full"
      />
      <br/>
      {coords.length && icons.map(({ background, link, Icon, iconClass, size }, i) => (
        <a
          key={link}
          className={cn("absolute size-7 rounded-full border-background border-[3px] bg-background flex justify-center items-center", background)}
          href={link}
          target="_blank"
          style={{ top: coords[i]?.y - 14, left: coords[i]?.x - 14 }}
        >
          <Icon className={iconClass} size={size} />
        </a>
      ))}
    </div>);
}