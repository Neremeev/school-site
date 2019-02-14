import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'main';

  constructor(translate: TranslateService) {
    translate.setDefaultLang('ru');
    translate.use('ru');
  }

}
