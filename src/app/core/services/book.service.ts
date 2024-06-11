import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { IBook } from '../models/common-model';

@Injectable({
  providedIn: 'root',
})

export class Bookervice {
  private dbPath = '/books';

  booksRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.booksRef = db.list(this.dbPath);
  }

  getAllBooks() {
    return this.booksRef;
  }

  getBook(key: string) {
    return this.db.object(`${this.dbPath}/${key}`);
  }

  addBook(book: IBook) {
    this.booksRef.push(book);
  }
  updateBook(key: string, book: IBook) {
    this.booksRef.update(key, book);
  }

  deleteBook(key: string) {
    this.booksRef.remove(key)
  }
}
