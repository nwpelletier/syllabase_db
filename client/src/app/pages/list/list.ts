import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Composer {
  id: number;
  firstName: string;
  lastName: string;
}

interface Collection {
  id: number;
  name: string;
  catalogue?: string;
  catalogueNumber?: number;
  composer: Composer;
}

interface Piece {
  id: number;
  name: string;
  collection: Collection;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.html',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
})
export class List implements OnInit {
  pieces: Piece[] = [];
  editingId: number | null = null;
  editedName: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Piece[]>('http://localhost:3000/pieces').subscribe({
      next: (data) => {
        this.pieces = data.sort((a, b) => {
          const composerCompare = a.collection.composer.lastName.localeCompare(
            b.collection.composer.lastName,
          );
          if (composerCompare !== 0) return composerCompare;

          const collectionCompare = a.collection.name.localeCompare(b.collection.name);
          if (collectionCompare !== 0) return collectionCompare;

          // Concatenate catalogue + catalogueNumber for sorting
          const aCat = a.collection.catalogue ?? '';
          const aNum = a.collection.catalogueNumber?.toString() ?? '';
          const bCat = b.collection.catalogue ?? '';
          const bNum = b.collection.catalogueNumber?.toString() ?? '';
          const catalogueCompare = (aCat + aNum).localeCompare(bCat + bNum);
          if (catalogueCompare !== 0) return catalogueCompare;

          return a.name.localeCompare(b.name);
        });
      },
      error: (err) => console.error('Error fetching pieces', err),
    });
  }

  getCatalogue(collection: Collection) {
    const cat = collection.catalogue;
    const num = collection.catalogueNumber;
    return cat && num ? `${cat}${num}` : (cat ?? num?.toString() ?? '');
  }

  startEdit(piece: Piece) {
    this.editingId = piece.id;
    this.editedName = piece.name;
  }

  cancelEdit() {
    this.editingId = null;
    this.editedName = '';
  }

  saveEdit(piece: Piece) {
    // Placeholder: send PUT request to backend
    piece.name = this.editedName;
    this.cancelEdit();
  }
}
