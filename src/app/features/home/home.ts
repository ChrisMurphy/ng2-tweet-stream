import { Component, View, OnInit, EventEmitter } from 'angular2/core';

import * as io from 'socket.io-client';

import { SocketService } from '../../core/services/socket-service';
import { Tweet } from '../../core/models/tweet';
import { ArraySort } from './array-sort';

@Component({
    selector: 'home',
    pipes: [ArraySort],
    template: `
	<h1>Leeds Tweets</h1>
    <p>{{ refresh }}</p>
    <div *ngFor="#tweet of tweets | arraySort:'-created_at'">
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
export class Home implements OnInit {
    private socket: SocketIOClient.Socket;
    tweetUpdates: EventEmitter<any>;
    tweets: Array<Tweet>;
    refresh: string;

    constructor(socketService: SocketService) {
        this.socket = socketService.getSocket();

        this.tweetUpdates = new EventEmitter<any>();
        this.tweets = new Array<Tweet>();

        this.socket.on('tweet-io:tweets', (message: any) => {
            console.log(`Server sent tweet at ${Date()}.`);
            this.tweetUpdates.emit(message);
        });

        this.tweetUpdates
            // transform - each element in the 
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
                this.tweets.push(...result)
                this.refresh = `List refreshed at ${Date()}`;
            });
    }

    ngOnInit() {
        this.socket.emit('tweet-io:start', true);
    }
}
