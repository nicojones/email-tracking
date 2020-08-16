import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTrackerComponent } from './newtracker/newtracker.component';
import { TrackerComponent } from './tracker/tracker.component';
import { TrackerListComponent } from './tracker-list/tracker-list.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'new', component: NewTrackerComponent },
  { path: 'tracker/:secret', component: TrackerComponent },
  { path: 'trackers/:user_secret', component: TrackerListComponent },
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'home', redirectTo: '/about', pathMatch: 'full' },
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})

export class AppRoutingModule { }
