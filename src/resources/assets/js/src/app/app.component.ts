import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ConfigProvider } from './config.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss',
  ]
})
export class AppComponent {
  constructor( 
    private titleService: Title,
    private configProvider: ConfigProvider
   ) {
     let title = configProvider.getConfig().title;
     this.titleService.setTitle( title );
   }
}
