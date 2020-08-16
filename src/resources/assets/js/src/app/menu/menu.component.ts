import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { Observable, Subject, fromEvent } from 'rxjs';

import { Tracker } from '../tracker';
import { TrackerService } from '../tracker.service';

import { ConfigProvider } from '../config.provider';
import { Config } from '../config';

import {
   debounceTime, distinctUntilChanged, switchMap, map
 } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  //tracker$: Observable<Tracker[]>;
  private searchTerms = new Subject<string>();
  public trackerSearch: Tracker[];
  public trackerList: Tracker[];
  public config: Config;

  //public searchQuery: string;
  @ViewChild('searchQuery') searchQuery;
  public input$: Observable<string>;


  constructor(private trackerService: TrackerService, private configProvider: ConfigProvider) {
    this.trackerList = this.trackerSearch = [];
    this.config = this.configProvider.getConfig();
  }

  // Push a search term into the observable stream.
  search(searchTerm: string): void {
    this.trackerService.searchTrackers(searchTerm)
    .subscribe(results => {
      this.trackerSearch = results;
      results.length && (this.trackerList = results);
    })
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.input$ = fromEvent(this.searchQuery.nativeElement, 'input')
      .pipe(
        debounceTime(500),
        map((e: KeyboardEvent) => e.target['value'])
      );
 
    this.input$.subscribe((searchTerm: string) => {
        this.search(searchTerm)
      });
 }

}
