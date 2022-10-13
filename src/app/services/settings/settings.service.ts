import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private _lang: string = 'fr';

  constructor() { }

  lang(): string {
    return this._lang;
  }

  changeLang() {
    if (this._lang === 'fr') {
      this._lang = 'en';
    } else {
      this._lang = 'fr';
    }
  }
}
