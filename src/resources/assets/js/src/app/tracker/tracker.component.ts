import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { TrackerService } from '../tracker.service';

import { Tracker } from '../tracker';
//import { Observable } from 'rxjs';
//import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Location } from '@angular/common';

import { environment as env } from '../../environments/environment';

@Component({
  selector: 'app-newtracker',
  templateUrl: './tracker.component.html',
  styleUrls: [
    './tracker.component.scss'
  ]
})
export class TrackerComponent {

  public tracker: Tracker = {} as Tracker;
  public env = env;
  public trackerVisits: any[] = [];

  constructor(
    private trackerService: TrackerService,
    private location: Location,
    private route: ActivatedRoute
   ) {
      this.route.params.subscribe((params: Params) => {
        this.getTracker(params.secret);
        this.trackerVisits = [];
      })
    }

  public getTracker(secret: string): void {
    this.trackerService.get(secret)
      .subscribe(tracker => {
        this.tracker = tracker;
        TrackerService.userSecret = tracker.user_secret;
      }
    );
  }

  public toggleTrackerState() {
    this.tracker.active = !this.tracker.active;
    this.trackerService.setActiveState(this.tracker)
    .subscribe(tracker => {
      this.tracker = tracker;
    })
  }

  public editTrackerTname() {
    if (!this.tracker.tname.trim()) {
      return
    }
    this.trackerService.editTrackerTname(this.tracker)
    .subscribe(tracker => {
      this.tracker = tracker;
    })
  }

  public editTrackerUsecret() {
    console.log('called this function...')
    if (!this.tracker.user_secret.trim()) {
      return
    }
    this.trackerService.editTrackerUsecret(this.tracker)
    .subscribe(tracker => {
      this.tracker = tracker;
      console.log('setting user secret')
      TrackerService.userSecret = tracker.user_secret;
    })
  }

  public getTrackerVisits() {
    this.trackerService.getTrackerVisits(this.tracker)
    .subscribe(visits => this.trackerVisits = visits)
  }
}
