import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TrackerService } from '../tracker.service';

import { Tracker } from '../tracker';

import { environment as env } from '../../environments/environment';

@Component({
  selector: 'app-newtracker',
  templateUrl: './tracker-list.component.html',
  styleUrls: [
    './tracker-list.component.scss'
  ]
})
export class TrackerListComponent implements OnInit {

  public trackers: Tracker[];
  public env: Object;

  constructor( 
    private trackerService: TrackerService,
    private route: ActivatedRoute
   ) { 
      this.env = env
      this.route.params.subscribe(val => {
        let userSecret = this.route.snapshot.paramMap.get('user_secret');
        this.getTrackers(userSecret);
      })
    }

  ngOnInit() {
    
  }

  getTrackers(user_secret: string): void {
    this.trackerService.getTrackers(user_secret)
      .subscribe(trackers => {
        this.trackers = trackers;
      }
    );
  }
}