import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const offsetFromParent = (ele: HTMLElement) => {
  let curleft = 0;
  let curtop = 0;
  if (ele.offsetParent) {
    curleft += ele.offsetLeft;
    curtop += ele.offsetTop;
    return {x: curleft, y: curtop};
  } else {
    return {x: 0, y: 0};
  }
}

export const polarToCartesian = (theta: number, radius: number) => {
  return {
    x: radius*Math.cos(theta),
    y: radius*Math.sin(theta)
  };
}