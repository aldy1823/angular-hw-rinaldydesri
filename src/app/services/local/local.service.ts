import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() {}

  saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getData(key: string): string | null {
    return localStorage.getItem(key)
  }

  removeData(key: string) {
    localStorage.removeItem(key);
  }

  clearData() {
    localStorage.clear();
  }
}