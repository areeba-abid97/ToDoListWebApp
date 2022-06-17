import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { User } from '../../models/UserModel';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Todo } from 'src/app/models/ToDoModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  bookmarkForm: FormGroup;
  taskForm: FormGroup;
  user: any;
  responseValue: any;
  bookmarks: any = [];
  tasks: any = [];
  err: string;
  bsubmitted = false;
  tsubmitted = false;
  taskErr: string;

  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.user !== null) {
      this.todoService.get(this.user.username)
        .subscribe(
          data => {
            this.responseValue = data;
            if (this.responseValue.result !== 'error') {
              if (this.responseValue.value !== undefined && this.responseValue.value.length > 0) {
                this.bookmarks = this.responseValue.value;
              } else {
                this.bookmarks = [];
              }
            } else {
              this.err = this.responseValue.message;
            }
          },
      this.todoService.get(this.user.username)
        .subscribe(
          data => {
            this.responseValue = data;
            if (this.responseValue.result !== 'error') {
              if (this.responseValue.value !== undefined && this.responseValue.value.length > 0) {
                this.tasks = this.responseValue.value;
              } else {
                this.tasks = [];
              }
            } else {
              this.err = this.responseValue.message;
            }
          },
    } else {
      this.router.navigate(['/login']);
    }

    this.clearBookmarkForm();
    this.clearTaskForm();
  }

  clearBookmarkForm() {
    this.bookmarkForm = this.formBuilder.group({
      id: [this.generateRandomId()],
      url: ['', Validators.required],
      name: ['', Validators.required],
      desc: [''],
      username: [this.user ? this.user.username : ''],
      date: [new Date()]
    });
  }

  clearTaskForm() {
    this.taskForm = this.formBuilder.group({
      id: [this.generateRandomId()],
      task: ['', Validators.required],
      username: [this.user ? this.user.username : ''],
      date: [new Date()],
      status: [true]
    });
  }

  get b() {
    return this.bookmarkForm.controls;
  }

  get t() {
    return this.taskForm.controls;
  }

  addBookmark() {
    this.bsubmitted = true;
    if (this.bookmarkForm.invalid) {
      return;
    } else {
      const bookmark = this.bookmarkForm.value;
      this.todoService.save(bookmark)
        .subscribe(
          data => {
            this.responseValue = data;
            if (this.responseValue.result !== 'error') {
              this.clearBookmarkForm();
              this.bookmarks.unshift(bookmark);
              this.bsubmitted = false;
            } else {
              this.taskErr = this.responseValue.message;
              this.bsubmitted = false;
            }
          });
    }
  }


  addTask() {
    this.tsubmitted = true;
    if (this.taskForm.invalid) {
      return;
    } else {
      const task = this.taskForm.value;
      this.todoService.save(task)
        .subscribe(
          data => {
            this.responseValue = data;
            if (this.responseValue.result !== 'error') {
              this.tasks.unshift(task);
              this.clearTaskForm();
              this.tsubmitted = false;
            } else {
              this.taskErr = this.responseValue.message;
              this.tsubmitted = false;
            }
          });
    }
  }

  generateRandomId() {
    return Math.random().toString(36).substring(10);
  }

  onCheckChange(task, event) {
    task.status = !event.srcElement.checked;
    this.todoService.update(task)
      .subscribe(
        data => {
          this.responseValue = data;
          if (this.responseValue.result === 'error') {
            task.status = event.srcElement.checked;
          }
        });
  }

  deleteTask(task: any) {
    this.todoService.delete(task)
      .subscribe(
        data => {
          this.responseValue = data;
          if (this.responseValue.result !== 'error') {
            this.tasks.splice(this.tasks.indexOf(task), 1);
          }
        });
  }

  deleteBookmark(book: any) {
    this.todoService.delete(book)
      .subscribe(
        data => {
          this.responseValue = data;
          if (this.responseValue.result !== 'error') {
            this.bookmarks.splice(this.bookmarks.indexOf(book), 1);
          }
        });
  }
}
