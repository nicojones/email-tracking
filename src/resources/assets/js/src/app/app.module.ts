import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
//import { NotifierModule }   from 'angular-notifier';
import { ToastrModule /*ToastNoAnimation, ToastNoAnimationModule*/ } from 'ngx-toastr';

import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './route-reuse.strategy';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from './../environments/environment';
import { Config } from './config';
import { ConfigProvider } from './config.provider';

//import { NgxNotificationComponent } from 'ngx-notification';
import { NewTrackerComponent } from './newtracker/newtracker.component';
import { TrackerComponent } from './tracker/tracker.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { TrackerListComponent } from './tracker-list/tracker-list.component';


export function configProviderFactory (configProvider: ConfigProvider) {
  return () => configProvider.load();
}

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    //NotifierModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right'
    })
  ],
  declarations: [
    AppComponent,
    //NgxNotificationComponent,
    NewTrackerComponent,
    AboutComponent,
    TrackerComponent,
    DashboardComponent,
    MenuComponent,
    TrackerListComponent
  ],
  providers: [
    ConfigProvider,
    { provide: APP_INITIALIZER, useFactory: configProviderFactory, deps: [ConfigProvider], multi: true },
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
