import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoanschemeService } from 'src/app/services/loanscheme/loanscheme.service';

@Component({
  selector: 'app-loanschemes',
  templateUrl: './loanschemes.component.html',
  styleUrls: ['./loanschemes.component.css']
})
export class LoanschemesComponent {
  loanSchemes: any[] = [];  
  totalElements: number = 0; // Total elements for pagination
  totalPages: number = 1; // Total pages available
  pageSize: number = 1; // Items per page
  currentPage: number = 1; // Current page number
  lastPage: boolean = false; // Indicator for the last page
  searchTerm: string = ''; // Search term for filtering loan schemes  

  constructor(private loanSchemeService: LoanschemeService, private router: Router) { }

  ngOnInit(): void {
    this.loadLoanSchemes(this.currentPage); // Load loan schemes on initialization
  }

  // Method to load loan schemes from the service
  loadLoanSchemes(page: number): void {
    this.loanSchemeService.getLoanSchemes(page, this.pageSize).subscribe(
      response => {
        this.loanSchemes = response.contents || [];
        this.totalElements = response.totalElements || 0;
        this.totalPages = response.totalPages || 1;
        this.lastPage = response.lastPage || false;
      },
      error => {
        console.error('Error fetching loan schemes:', error);
        alert('Failed to fetch loan schemes. Please try again later.');
      }
    );
  }

  // Method to handle page changes
  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadLoanSchemes(this.currentPage);
    }
  }

  // Method to go to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadLoanSchemes(this.currentPage);
    }
  }

  // Method to go to the previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadLoanSchemes(this.currentPage);
    }
  }

  // Get filtered loan schemes based on the search term
  get filteredLoanSchemes(): any[] {
    if (!this.searchTerm.trim()) return this.loanSchemes;

    const searchText = this.searchTerm.toLowerCase();
    return this.loanSchemes.filter(scheme =>
      Object.values(scheme).some(value =>
        value != null && value.toString().toLowerCase().includes(searchText)
      )
    );
  }

  
}
