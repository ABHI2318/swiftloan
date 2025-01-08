import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanOfficerService } from 'src/app/services/loan-officer/loan-officer.service';

@Component({
  selector: 'app-pendingloanrequest',
  templateUrl: './pendingloanrequest.component.html',
  styleUrls: ['./pendingloanrequest.component.css']
})
export class PendingloanrequestComponent {
  loans: any[] = [];
  rejectionForm: FormGroup;
  selectedLoanId: number | null = null; // Holds the ID of the selected loan
  pageNumber: number = 0;
  pageSize: number = 3;
  totalPages: number = 0;
  isLastPage: boolean = false;
  pages: number[] = [];
  isRejectModalOpen: boolean = false; // Flag to manage modal visibility

  constructor(
    private fb: FormBuilder,
    private loanService: LoanOfficerService
  ) {
    this.rejectionForm = this.fb.group({
      rejectionRemark: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.fetchLoanRequests(this.pageNumber, this.pageSize);
  }

  fetchLoanRequests(pageNumber: number, pageSize: number): void {
    this.loanService.getLoanRequests(this.pageNumber, this.pageSize).subscribe({
      next: (response: any) => {
        this.loans = response.contents;
        this.totalPages = response.totalPages;
        this.isLastPage = response.last;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
      },
      error: (err: any) => console.error('Error fetching loan requests:', err)
    });
  }

  approveLoan(loanId: number): void {
    this.loanService.approveLoan(loanId).subscribe({
      next: () => {
        alert('Loan approved successfully');
        this.fetchLoanRequests(this.pageNumber, this.pageSize); // Refresh the loan list
      },
      error: (err: any) => {
        console.error('Error approving loan:', err);
        alert('Failed to approve loan. Please try again.');
      }
    });
  }

  openRejectModal(loan: any): void {
    this.selectedLoanId = loan.loanid; // Store the loan ID
    this.rejectionForm.reset();
    this.isRejectModalOpen = true; // Open the reject modal
  }

  closeRejectModal(): void {
    this.isRejectModalOpen = false; // Close the reject modal
  }

  submitRejectionRemark(): void {
    if (this.rejectionForm.valid && this.selectedLoanId !== null) {
      const rejectionPayload = {
        message: this.rejectionForm.get('rejectionRemark')?.value
      };

      this.loanService.rejectLoan(this.selectedLoanId, rejectionPayload).subscribe({
        next: () => {
          alert('Loan rejected successfully');
          this.fetchLoanRequests(this.pageNumber, this.pageSize); // Refresh loan list
          this.closeRejectModal();
        },
        error: (err: any) => {
          console.error('Rejection failed:', err);
          alert('Failed to reject loan. Please try again.');
        }
      });
    }
  }

  onPageChange(newPage: number): void {
    this.pageNumber = newPage;
    this.fetchLoanRequests(this.pageNumber, this.pageSize);
  }
}