import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TrackerService } from '../tracker.service';

import { Tracker } from '../tracker';
import { Location } from '@angular/common';


@Component({
  selector: 'app-newtracker',
  templateUrl: './newtracker.component.html',
  styleUrls: [
    './newtracker.component.scss'
  ]
})
export class NewTrackerComponent {

  public tracker = new Tracker();

  public readonly addText: string = 'Add +';

  public loadingText: string = null;

  constructor (
    private trackerService: TrackerService,
    private location: Location,
    private router: Router
  ) {
  }

  createNew (): void {
    this.loadingText = 'Creating...';
    this.trackerService.createNew({ ...this.tracker, user_secret: TrackerService.userSecret })
    .subscribe(
      (tracker: Tracker) => {
        this.loadingText = null;
        this.tracker = tracker;

        this.router.navigate(['/tracker', tracker.secret]);
      },
      () => this.loadingText = null
    );
  }

}
