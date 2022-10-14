import { Component, Inject, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { FormControl } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  toggleControl = new FormControl(false);

  constructor(private settingsService: SettingsService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
  }

  lang() {
    return this.settingsService.lang();
  }

  changeLang() {
    this.settingsService.changeLang();
  }

  toogleMode() {
      this.document.getElementsByTagName('body')[0].classList.toggle('lightmode');
      this.document.getElementsByTagName('body')[0].classList.toggle('darkmode');
      this.document.getElementById('header')?.classList.toggle('lightmode');
      this.document.getElementById('header')?.classList.toggle('darkmode');
  }

}
