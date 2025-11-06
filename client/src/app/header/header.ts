import { Component } from '@angular/core';
import { Nav } from '../nav/nav';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Nav],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {}
