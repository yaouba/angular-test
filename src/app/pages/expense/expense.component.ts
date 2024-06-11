import { Bookervice } from './../../core/services/book.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IBook } from '../../core/models/common-model';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.sass',
})
export class ExpenseComponent implements OnInit {
  books: IBook[] = [];

  constructor(private bookService: Bookervice, private router: Router) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookService
      .getAllBooks()
      .snapshotChanges()
      .subscribe({
        next: (data) => {
          this.books = [];
          data.forEach((item) => {
            let book = item.payload.toJSON() as IBook;

            this.books.push({
              key: item.key || '',
              title: book.title,
              author: book.author,
              date: book.date,
              tags: book.tags,
              note: book.note,
              comment: book.comment,
            });
          });
        },
      });
  }

  editBook(key: string) {
    this.router.navigate(['/expense-form/' + key])
  } 

  removeBook(key: string) {
    if (window.confirm('Do you realy want to delete that book?'))
      this.bookService.deleteBook(key);
  }
}

