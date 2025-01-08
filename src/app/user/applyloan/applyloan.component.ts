// applyloan.component.ts

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { ApplyloansService } from 'src/app/services/applyloan/applyloans.service';

@Component({
  selector: 'app-applyloan',
  templateUrl: './applyloan.component.html',
  styleUrls: ['./applyloan.component.css']
})
export class ApplyloanComponent implements OnInit {
  @Output() loanSubmitted = new EventEmitter<void>(); // Emit event on submission

  uploadForm: FormGroup;
  file: File | null = null;
  loanSchemeId: any;

  constructor(
    private fb: FormBuilder, 
    private loanService: ApplyloansService,
    private route: ActivatedRoute // Inject ActivatedRoute to access query parameters
  ) {
    this.uploadForm = this.fb.group({
      loanAmount: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Get the query parameter `schemeId` from the URL
    this.route.queryParams.subscribe(params => {
      this.loanSchemeId = params['schemeId'];
      if (!this.loanSchemeId) {
        console.error('Loan scheme ID is missing.');
      }
    });
  }

  onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files?.length) {
      const selectedFile = files[0];
      const allowedTypes = ['application/pdf', 'image/jpeg'];
      if (!allowedTypes.includes(selectedFile.type)) {
        alert('Only PDF and JPEG files are allowed.');
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert('File size exceeds the maximum limit of 5 MB.');
        return;
      }
      this.file = selectedFile;
    }
  }

  onSubmit(): void {
    if (this.file && this.uploadForm.valid) {
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('loanamount', this.uploadForm.value.loanAmount);
      formData.append('time', this.uploadForm.value.time);

      if (this.loanSchemeId) {
        formData.append('loanscheme_id', this.loanSchemeId.toString());

        this.loanService.uploadFile(formData, this.loanSchemeId).subscribe(
          (response) => {
            console.log('Loan application successful:', response);
            alert('Loan application submitted successfully.');
            this.loanSubmitted.emit(); // Emit event when successful
          },
          (error) => {
            console.error('Error submitting loan application:', error);
            alert('Failed to submit the application. Please try again.');
          }
        );
      } else {
        alert('Loan scheme details are missing.');
      }
    } else {
      alert('Please fill the form correctly and upload a valid file.');
    }
  }
}
