import { Component, View } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router';

import 'rxjs/add/operator/map';

import { Home } from '../home/home';

@Component({
  selector: 'app',
  template: `
	<router-outlet></router-outlet>
	`,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {path:'/', name: 'Home', component: Home}
])
export class Application {
}
