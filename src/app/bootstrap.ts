import 'zone.js/dist/zone.min.js';
import 'reflect-metadata';

import { bootstrap } from 'angular2/platform/browser';
import { provide } from 'angular2/core';
import { ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';
import { Application } from './features/app/app';
import { TwitterService } from './core/services/twitter-service';
import { SocketService } from './core/services/socket-service';

bootstrap(Application, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    TwitterService,
    SocketService
]);
