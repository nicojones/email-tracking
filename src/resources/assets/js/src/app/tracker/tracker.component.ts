import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
export class TrackerComponent implements OnInit {

  @Input() tracker: Tracker;
  public env: Object;
  private debounceDelay = 2000;
  public trackerVisits: Object = {};

  constructor( 
    private trackerService: TrackerService,
    private location: Location,
    private route: ActivatedRoute
   ) { 
      this.env = env
      this.route.params.subscribe(val => {
        let secret = this.route.snapshot.paramMap.get('secret');
        this.getTracker(secret);
        this.trackerVisits = [];
      })
    }

  ngOnInit() {
    
  }

  getTracker(secret: string): void {
    this.trackerService.get(secret)
      .subscribe(tracker => {
        this.tracker = tracker;
      }
    );
  }

  setTrackerState(active: boolean) {
    this.tracker.active = !this.tracker.active;
    this.trackerService.setActiveState(this.tracker)
    .subscribe(tracker => {
      this.tracker = tracker;
    })
  }

  editTrackerTname() {
    if (!this.tracker.tname.trim()) {
      return
    }
    this.trackerService.editTrackerTname(this.tracker)
    .subscribe(tracker => {
      this.tracker = tracker;
    })
  }
  
  editTrackerUsecret(user_secret: string) {
    if (!this.tracker.user_secret.trim()) {
      return
    }
    this.trackerService.editTrackerUsecret(this.tracker)
    .subscribe(tracker => {
      this.tracker = tracker;
    })
  }

  getTrackerVisits() {
    this.trackerService.getTrackerVisits(this.tracker)
    .subscribe(visits => this.trackerVisits = visits)
  }
}