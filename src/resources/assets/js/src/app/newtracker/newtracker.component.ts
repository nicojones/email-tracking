import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { TrackerService } from '../tracker.service';

import { Tracker } from '../tracker';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

import { environment as env } from '../../environments/environment';

@Component({
  selector: 'app-newtracker',
  templateUrl: './newtracker.component.html',
  styleUrls: [
    './newtracker.component.scss'
  ]
})
export class NewTrackerComponent implements OnInit {

  @Input() tracker: Tracker;
  public env: Object;

  constructor( 
    private trackerService: TrackerService,
    private location: Location,
    private router: Router
    ) { 
      this.env = env
      this.tracker = new Tracker;
    }

  ngOnInit() {
    
  }

  createNew(): void {
    this.trackerService.createNew(this.tracker)
      .subscribe(tracker => {
        console.log(tracker)
        this.tracker = tracker

        this.router.navigate(['/tracker', tracker.secret])
      }
    );
  }

}