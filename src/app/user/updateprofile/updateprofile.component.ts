

import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';


@Component({
  selector: 'app-updateprofile',
   templateUrl: './updateprofile.component.html',
   styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.userForm = this.fb.group({
      username: new FormControl(),
      // ('', [
      //   Validators.required,
      //   Validators.email
      // ]),

      password: new FormControl(),
      // ('', [
      //   Validators.required,
      //   Validators.pattern(
      //     '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
      //   )
      // ]),
      firstName: new FormControl(),
      // ('', [
      //   Validators.required,
      //   Validators.pattern("^[A-Za-z]+(?:[ -'][A-Za-z]+)*$")
      // ]),
      lastName: new FormControl(),
      // ('', [
      //   Validators.required,
      //   Validators.pattern("^[A-Za-z]+(?:[ -'][A-Za-z]+)*$")
      // ]),
      contactNumber: new FormControl(),
      // ('', [
      //   Validators.required,
      //   Validators.pattern("^[7-9]{1}[0-9]{9}$")
      // ]),
      pancardNumber: new FormControl(),
      dob: new FormControl(),
      // ('', [Validators.required]),
      // pancardNumber: new FormControl('', [
      //   Validators.required,
      //   Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]{1}$")
      // ]),
      gender: new FormControl()
    //   ('', [Validators.required])
    // });
  });
}

onSubmit() {
  if (this.userForm.valid) {
    this.loginService.register(this.userForm.value).subscribe(data => {
      alert("Student added successfully");
      this.router.navigateByUrl('/login');
    });
  } else {
    alert("Please fill out the form correctly.");
  }
}
}
  // onSubmit() {
  //   // if (this.userForm.valid) {
  //     this.loginService.register(this.userForm.value).subscribe(
  //       data => {
  //         alert("User added successfully");
  //         this.router.navigateByUrl('/');
  //       },
  //       error => {
  //         alert("An error occurred during registration");
  //       }
  //     );
  //   // } else {
  //   //   alert("Please fill out the form correctly.");
  //   // }
  // }

  // get username() { return this.userForm.get('username'); }
  // get password() { return this.userForm.get('password'); }
  // get firstname() { return this.userForm.get('firstname'); }
  // get lastname() { return this.userForm.get('lastname'); }
  // get contactNo() { return this.userForm.get('contactNo'); }
  // get dob() { return this.userForm.get('dob'); }
  // get pancardNumber() { return this.userForm.get('pancardNumber'); }
  // get gender() { return this.userForm.get('gender'); }

