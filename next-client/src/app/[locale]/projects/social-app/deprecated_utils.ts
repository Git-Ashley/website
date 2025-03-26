import { ReactNode } from "react";

export class HashMap<T extends Record<string, unknown>> {
  _data: Map<string, T>;

  constructor(rawValue?: [string, T][] | HashMap<T>){
    this._data = new Map();

    if(Array.isArray(rawValue)){
      this._data = new Map(rawValue);
    } else if (rawValue) {
      rawValue._data.forEach((val, key) => {
        if (val !== null && typeof val === 'object') {
          this.insert(key, Object.assign({}, val));
        } else {
          this.insert(key, val);
        }
      });
    }
  }

  [Symbol.iterator]() {
    return this._data.values();
  }

  map(callback: (value: T, index: number, array: T[]) => ReactNode){
    return Array.from(this._data.values()).map(callback);
  }

  forEach(callback: (value: T, index: number, array: T[]) => void){
    return Array.from(this._data.values()).forEach(callback);
  }

  insert(key: string, value: T){
    return this._data.set(key, value);
  }

  insertMany(iterable: T[], keyField: string){
    for(let value of iterable) {
      const key = value[keyField]
      if (typeof key !== "string")
        continue;

      this.insert(key, value);
    }
  }

  remove(key: string){
    this._data.delete(key);
  }

  get(key: string){
    return this._data.get(key);
  }

  print(msg?: string){
    console.log(msg);
    console.log(`_data: ${JSON.stringify(Array.from(this._data.values()))}`);
  }
}

export const NODE_SOCIAL_URL = process.env.NEXT_PUBLIC_NODESOCIAL_API;
export const USER_SESSION_KEY = "Usersession";
export const API_OPTIONS = { credentials: 'include' };
