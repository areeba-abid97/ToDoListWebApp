import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm?: FormGroup;
  loading = false;
  submitted = false;
  loginError!: string;
  responseValue: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService
  ) {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
   }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.todoService.login(this.loginForm.value)
        .subscribe(
          data => {
            this.responseValue = data;
            if (this.responseValue.result !== 'error') {
              localStorage.setItem('currentUser', JSON.stringify(this.responseValue.value));
              this.router.navigate(['/']);
            } else {
              this.loginError = this.responseValue.message;
            }
          },
          error => {
            this.loginError = 'Something went wrong! Please try again later.';
            this.loading = false;
          });
    }
  }
}
