import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanschemeService } from 'src/app/services/loanscheme/loanscheme.service';

@Component({
  selector: 'app-add-loan-scheme',
  templateUrl: './add-loan-scheme.component.html',
  styleUrls: ['./add-loan-scheme.component.css']
})
export class AddLoanSchemeComponent {
  loanSchemeForm: FormGroup;

  constructor(private fb: FormBuilder, private loanSchemeService: LoanschemeService, private router: Router) {

    this.loanSchemeForm = this.fb.group({
      schemename: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z ]+$')  // Only alphabets and spaces allowed
      ]),

      maxamount: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')  // Only numbers and optional 2 decimal points
      ]),

      minamount: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')  // Only numbers and optional 2 decimal points
      ]),

      interest: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')  // Only numbers and optional 2 decimal points
      ])
    });
  }

  onSubmit() {
    if (this.loanSchemeForm.valid) {
     
      const formData = { ...this.loanSchemeForm.value };

     
      for (let key in formData) {
        if (typeof formData[key] === 'string') {
          formData[key] = formData[key].toLowerCase();
        }
      }

    
      this.loanSchemeService.addloanScheme(formData).subscribe(data => {
        alert('Loan scheme added successfully');
        this.router.navigateByUrl('/admin/viewloanscheme');
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}