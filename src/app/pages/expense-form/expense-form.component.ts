import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Bookervice } from '../../core/services/book.service';
import { IBook } from '../../core/models/common-model';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.sass',
})
export class ExpenseFormComponent implements OnInit {
  books: IBook[] = [];
  bookForm!: FormGroup;
  bookId: string = '';

  constructor(
    private fb: FormBuilder,
    private bookService: Bookervice,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private firebaeStorage: AngularFireStorage
  ) {
    this.bookForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      tags: new FormControl('', [Validators.required]),

      imageUrl: new FormControl(''),
      note: new FormControl(''),
      comment: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        if (params['id']) {
          this.bookId = params['id'];
          this.getBook(this.bookId);
        }
      },
    });
  }

  getBook(key: string) {
    this.bookService
      .getBook(key)
      .snapshotChanges()
      .subscribe({
        next: (data: { payload: { toJSON: () => any } }) => {
          let book = data.payload.toJSON() as IBook;
          this.bookForm.setValue(book);
        },
      });
  }

  async onFileChange(event: any) {
    const file = event.target.files[0]
    if (file) {
      const path = `books/${file.name}`
      const uploadTask = await this.firebaeStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      this.bookForm.get('imageUrl')?.setValue(url);
    }
  }

  onSubmit() {
    if (this.bookForm.valid) {
      if (this.bookId !== '') {
        this.bookService.updateBook(this.bookId, this.bookForm.value);
      } else {
        this.bookService.addBook(this.bookForm.value);
      }

      this.router.navigate(['/']);
    } else {
      this.bookForm.markAllAsTouched();
    }
  }
}
