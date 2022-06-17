import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/UserModel';
import { Todo } from '../models/ToDoModel';
import { environment } from 'src/environments/environment';

@Injectable()
export class TodoService {

  constructor(private http: HttpClient) {
  }

  saveB(book) {
    return this.http.post(environment.apiUrl + 'api/entity/bookmark', book);
  }

  getB(user) {
    return this.http.get(environment.apiUrl + 'api/entity/bookmark/' + user);
  }

  deleteB(book) {
    return this.http.post(environment.apiUrl + 'api/entity/delete/bookmark', book);
  }

  saveT(task) {
    return this.http.post(environment.apiUrl + 'api/entity/task', task);
  }

  getT(user) {
    return this.http.get(environment.apiUrl + 'api/entity/task/' + user);
  }

  deleteT(task) {
    return this.http.post(environment.apiUrl + 'api/entity/delete/task', task);
  }

  updateT(task) {
    return this.http.put(environment.apiUrl + 'api/entity/task', task);
  }

  login(user: User) {
    return this.http.post(environment.apiUrl + 'api/users/login', user);
  }

  register(user: User) {
    return this.http.post<{ message: string }>(environment.apiUrl + 'api/users/register', user);
  }
}
