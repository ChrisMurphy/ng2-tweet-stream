import { Component, OnInit } from 'angular2/core';
import { Http, Response } from 'angular2/http';

import { TwitterService } from '../../core/services/twitter-service';
import { Tweet } from '../../core/models/tweet';

@Component({
  selector: 'timeline',
  template: `
  <button (click)="getTimeline()">Refresh</button>
  <p>{{ refresh }}</p>
  <div *ngFor="#tweet of tweets">
    <ul>
      <li><img src="{{ tweet.user_profile_image_url }}" /></li>    
      <li>{{ tweet.id_str }}</li>
      <li>{{ tweet.created_at }}</li>
      <li>{{ tweet.text }}</li>
      <li>{{ tweet.user_screen_name }}</li>
      <li>{{ tweet.user_name }}</li>
    </ul>
  </div>
  `
})
export class Timeline implements OnInit {
  tweets: Array<Tweet>;
  refresh: string;

  constructor(private http: Http) {
  }
  
  getTimeline() {
      // make the call
    this.http.get('/api/twitter/timeline')
      // initial transform - result to json
      .map((response: Response) => {
        return response.json();
      })
      // next transform - each element in the 
      // array to a Tweet class instance
      .map((tweets: Array<any>) => {
        let result: Array<Tweet> = [];
        if (tweets) {
          tweets.forEach((tweet) => {
            result.push(
              new Tweet(
                tweet.id_str,
                tweet.created_at,
                tweet.text,
                tweet.user.screen_name,
                tweet.user.name,
                tweet.user.profile_image_url
              ));
          });
        }
        return result;
      })
      // subscribe to output from this observable and bind
      // the output to the component when received
      .subscribe((result: Array<Tweet>) => {
        this.tweets = result;
        this.refresh = `List refreshed at ${Date()}`;
      }); 
  }
  
  ngOnInit() {
    this.getTimeline();
  }
}