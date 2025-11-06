import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Composer {
  id: number;
  firstName: string;
  lastName: string;
  birthYear?: number;
  deathYear?: number;
  nationality?: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.html',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
})
export class List implements OnInit {
  composers: Composer[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Composer[]>('http://localhost:3000/composers').subscribe({
      next: (data) => (this.composers = data),
      error: (err) => console.error('Error fetching composers', err),
    });
  }
}
