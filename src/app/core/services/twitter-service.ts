import { Injectable } from 'angular2/core';
import { Http, Headers} from 'angular2/http';

@Injectable()
export class TwitterService {
  constructor(private http: Http) { 
  }
  
  getTimeline() {
    return this.http.get('/api/twitter/timeline');
  }
}