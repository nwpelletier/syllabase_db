import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter, withHashLocation, Routes } from '@angular/router';
import 'zone.js';

import { Home } from './app/pages/home/home';
import { List } from './app/pages/list/list';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'list', component: List },
];

bootstrapApplication(App, {
  providers: [provideRouter(routes, withHashLocation())],
}).catch((err) => console.error(err));
