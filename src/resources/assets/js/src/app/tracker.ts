import { TrackerService } from './tracker.service';


export class Tracker {
    src: number;
    hash: string;
    secret: string;
    tname: string;
    active: boolean;
    user_secret: string;
    visits: number;
    search_type: 'secret' | 'list';

    constructor () {
        this.user_secret = TrackerService.userSecret;
    }
  }
