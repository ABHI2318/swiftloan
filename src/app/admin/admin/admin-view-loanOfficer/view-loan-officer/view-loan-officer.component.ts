import { Component } from '@angular/core';
import { LoanOfficerService } from 'src/app/services/loan-officer/loan-officer.service';

@Component({
  selector: 'app-view-loan-officer',
  templateUrl: './view-loan-officer.component.html',
  styleUrls: ['./view-loan-officer.component.css']
})
export class ViewLoanOfficerComponent {
  
      loanOfficers: any[] = [];
      totalElements: number = 0;
      totalPages: number = 0;
      pageSize: number = 10;
      currentPage: number = 1;
      searchText: string = '';
      pageSizes: number[] = [5, 10, 15, 20];
    
      constructor(private loanOfficerService: LoanOfficerService) { }
    
      ngOnInit(): void {
        this.getLoanOfficers(this.currentPage);
      }
    
      getLoanOfficers(page: number): void {
        this.loanOfficerService.getAllLoanOfficer(page-1, this.pageSize).subscribe(response => {
          this.loanOfficers = response.contents;
          console.log(this.loanOfficers)
          this.totalElements = response.totalElements;
          this.totalPages = response.totalPages;
        });
      }
    
      goToPage(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page;
          this.getLoanOfficers(page);
        }
      }
    
      changePageSize(): void {
        this.currentPage = 1; // Reset to first page when page size changes
        this.getLoanOfficers(this.currentPage);
      }
    
      toggleDeleteLoanScheme(id: any): void {
        const officerId = this.loanOfficers.find( officer => officer.officerId === id);
        if (!officerId) return;
    
        const isCurrentlyDeleted = officerId.isdeleted;
        const actionMessage = isCurrentlyDeleted ? 'activate' : 'deactivate';
        const confirmationMessage = `Are you sure you want to ${actionMessage} this loan Officer?`;
    
        if (confirm(confirmationMessage)) {
          this.loanOfficerService.deleteLoanOfficer(id).subscribe(
            () => {
              // Reload the loan schemes after toggling the deletion state
              this.getLoanOfficers(this.currentPage);
    
              const successMessage = isCurrentlyDeleted
                ? 'Loan scheme successfully activated.'
                : 'Loan scheme successfully deactivated.';
              alert(successMessage);
            },
            error => {
              console.error('Error toggling loan officer:', error);
              alert('Failed to delete loan officer. Please try again.');
            }
          );
        }
      }
    
      // Search through the loan schemes
      get filteredLoanSchemes(): any[] {
        if (!this.searchText.trim()) return this.loanOfficers;
    
        const searchText = this.searchText.toLowerCase();
        return this.loanOfficers.filter(officer =>
          Object.values(officer).some(value =>
            value != null && value.toString().toLowerCase().includes(searchText)
          )
        );
      }
    }