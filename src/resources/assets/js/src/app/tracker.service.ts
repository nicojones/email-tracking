import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//import { NotifierService } from 'angular-notifier';
//import { NgxNotificationService } from 'ngx-notification';
import { ToastrService } from 'ngx-toastr';

import { Observable, of } from 'rxjs';
import { catchError, tap, debounceTime } from 'rxjs/operators';

import { environment as env } from '../environments/environment';
import { ConfigProvider } from './config.provider';
import { Config } from './config';

import { Tracker } from './tracker';

@Injectable({ providedIn: 'root' })
export class TrackerService {

  public static userSecret: string = null;

  private imageUrl = env.API_BASE_URL + '/image';
  private apiUrl   = env.API_BASE_URL + '/api';
  private readonly notifier: ToastrService;
  private config: Config;

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private configProvider: ConfigProvider
    ) {
      this.notifier = toastrService;
      this.log('loaded image service', 'info');
      this.config = configProvider.getConfig();
  }

  createNew(tracker: Tracker): Observable<Tracker> {
    return this.http.post<Tracker>(this.imageUrl + '/new', tracker)
      .pipe(
        tap(_ => this.log('created new image', 'success')),
        catchError(this.handleError<Tracker>('create new Tracker failed'))
      );
  }

  get(secret: string): Observable<Tracker> {
    return this.http.get<Tracker>(this.apiUrl + '/tracker/' + secret)
      .pipe(
        //tap(_ => this.log('fetched tracker')),
        catchError(this.handleError<Tracker>('fetch Tracker failed'))
      );
  }

  getTrackers(userSecret: string): Observable<Tracker[]> {
    return this.http.get<Tracker[]>(this.apiUrl + '/trackers/' + userSecret)
      .pipe(
        tap(_ => this.log('fetched list of trackers')),
        catchError(this.handleError<Tracker[]>('fetch Tracker list failed'))
      );
  }

  setActiveState(tracker: Tracker): Observable<Tracker> {
    return this.http.post<Tracker>(this.config.url.trackerSetState, tracker)
      .pipe(
        tap(_ => this.log('changed tracker state to ' + (tracker.active ? 'active' : 'disabled'), 'info')),
        catchError(this.handleError<Tracker>('changed Tracker state failed'))
      );
  }

  editTrackerTname(tracker: Tracker): Observable<Tracker> {
    return this.http.post<Tracker>(this.apiUrl + '/changename', tracker)
      .pipe(
        tap(_ => this.log('changed tracker Name to ' + tracker.tname, 'info')),
        catchError(this.handleError<Tracker>('changed Tracker name failed'))
      );
  }

  editTrackerUsecret(tracker: Tracker): Observable<Tracker> {
    return this.http.post<Tracker>(this.apiUrl + '/changeusecret', tracker)
      .pipe(
        tap(_ => this.log('changed tracker User-Code to ' + tracker.user_secret, 'info')),
        catchError(this.handleError<Tracker>('changed Tracker User-Code failed'))
      );
  }

  getTrackerVisits(tracker: Tracker): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/tracker-visits/' + tracker.secret)
      .pipe(
        tap(_ => this.log('fetched tracker visits')),
        catchError(this.handleError<any[]>('fetch visits list failed'))
      );
  }

  /* GET heroes whose name contains search term */
  searchTrackers(term: string): Observable<Tracker[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Tracker[]>(`${this.apiUrl}/search?q=${term}`).pipe(
      debounceTime(1000),
      tap(_ => this.log(`found tracker matching secret "${term}"`)),
      catchError(this.handleError<Tracker[]>('searchTrackers', []))
    );
  }


  /** Log a HeroService message with the MessageService */
  private log(message: string, type?: string) {
    type = type || 'info';
    // error info success warning
    this.notifier[type](message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`, 'error');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
