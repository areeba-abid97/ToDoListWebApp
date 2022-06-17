import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  err!: string;
  responseValue: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private todoService: TodoService,
  ) { 
    if (localStorage.getItem('currentUser') !== null) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.ngxService.start();
    if (this.registerForm.valid) {
      this.loading = true;
      this.todoService.signup(this.registerForm.value)
        .subscribe(
          data => {
            this.responseValue = data;
            this.ngxService.stop();
            if (this.responseValue.result === 'error') {
              this.err = this.responseValue.message;
              this.loading = false;
            } else {
              this.router.navigate(['/login']);
            }
          },
          error => {
            this.ngxService.stop();
            this.err = 'Something went wrong! Please try again';
            this.loading = false;
          });
    }
  }
}
