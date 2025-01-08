import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanschemeService } from 'src/app/services/loanscheme/loanscheme.service';
@Component({
  selector: 'app-update-loan-scheme',
  templateUrl: './update-loan-scheme.component.html',
  styleUrls: ['./update-loan-scheme.component.css']
})
export class UpdateLoanSchemeComponent {
  loanSchemeForm: FormGroup;
  schemeId: any = "";
  @Input() id: any = "";

  constructor(private fb: FormBuilder,
    private loanSchemeService: LoanschemeService,
    private router: Router,
    private route: ActivatedRoute) {
    this.loanSchemeForm = this.fb.group({
      schemename: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      maxamount: new FormControl('', [
        Validators.required,
        Validators.min(0)
      ]),
      minamount: new FormControl('', [
        Validators.required,
        Validators.min(0)
      ]),
      interest: new FormControl('', [
        Validators.required,
        Validators.min(0.01),
        Validators.max(100)
      ])
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.schemeId = params['id']; // Get 'id' from query parameters
      this.getloanSchemeById(this.schemeId); // Fetch the loan scheme details
    });
  }

  getloanSchemeById(id: any) {
    this.loanSchemeService.getLoanschemeById(id).subscribe(data => {
      this.loanSchemeForm.patchValue(data);
    });
  }

  onCancel() {
    // Navigate back to the View Loan Scheme page
    this.router.navigateByUrl('admin/viewloanscheme');
  }
  onSubmit() {
    if (this.loanSchemeForm.valid) {
      this.loanSchemeService.updateLoanScheme(this.schemeId, this.loanSchemeForm.value).subscribe(
       {
              next: (data) =>{ alert("Loan Scheme updated successfully");
              this.router.navigateByUrl('admin/viewloanscheme');
            },  error: (error: HttpErrorResponse) => {
              if (error.status === 400 && error.error && error.error.message) {
                alert(error.error.message); // Show the custom error message from the response
              } else {
                alert("An unexpected error occurred!"); // Fallback for other errors
              }
            },
          });
    } else {
      alert('Please fill out the form correctly.');
    }
  }

  get f() {
    return this.loanSchemeForm.controls;
  }
}