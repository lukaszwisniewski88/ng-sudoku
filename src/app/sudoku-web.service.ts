import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { AngularFirestore } from '@angular/fire/firestore';

interface SudokuResponse {
  response: boolean;
  size: number;
  squares: { x: number; y: number; value: number }[];
}
interface boardsCollection extends SudokuResponse {
  difficulty: number;
}

@Injectable({
  providedIn: 'root',
})
export class SudokuWebService {
  constructor(private http: HttpClient, private db: AngularFirestore) {}
  readonly ROOT_URL = 'http://www.cs.utep.edu/cheon/ws/';
  readonly CORS = 'https://cors-anywhere.herokuapp.com/';

  getRandomBoard(size = 9, difficulty = 3) {
    let url = `${this.CORS}${this.ROOT_URL}/sudoku/new/?size=${size}&level=${difficulty}`;
    const board$ = this.http
      .get<SudokuResponse>(url, {
        reportProgress: true,
        observe: 'body',
        responseType: 'json',
      })
      .pipe(share());
    //this.saveBoard(board$, difficulty)
    return board$;
  }
  getFireBoard(difficulty = 3) {
    const board$ = this.db
      .collection<boardsCollection>('boards', (ref) =>
        ref.where('difficulty', '==', difficulty)
      )
      .get();
    let fireBoard$ = board$.pipe(
      map((field) => {
        const range = field.size;
        const index = Math.floor(Math.random() * range);
        const response = { ...(field.docs[index].data() as SudokuResponse) };
        return response;
      })
    );
    return fireBoard$;
  }
  saveBoard(board$: Observable<SudokuResponse>, difficulty: number): void {
    const boardsCollection = this.db.collection<boardsCollection>('boards');
    let subscription = board$
      .pipe(
        map((board) => {
          return from(
            boardsCollection.doc<boardsCollection>(`${uuid()}`).set({
              response: board.response,
              difficulty,
              size: board.size,
              squares: board.squares,
            })
          );
        })
      )
      .subscribe((_value) => {
        console.log('saved');
      });
  }
}
