import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllappliedloanService } from 'src/app/services/applyloan/allappliedloan.service';

@Component({
  selector: 'app-allappliedloan',
  templateUrl: './allappliedloan.component.html',
  styleUrls: ['./allappliedloan.component.css']
})
export class AllappliedloanComponent implements OnInit {
  loans: any[] = [];
  totalElements: number = 0; // Total elements for pagination
  totalPages: number = 1;   // Total pages available
  pageSize: number = 1;    // Items per page
  currentPage: number = 1;  // Current page number
searchTerm: string = '';

get filteredLoans() {
  return this.loans.filter(loan =>
    ((loan.user_id ? String(loan.user_id).toLowerCase() : '').includes(this.searchTerm.toLowerCase()) || 
     (loan.loanstatus ? String(loan.loanstatus).toLowerCase() : '').includes(this.searchTerm.toLowerCase()))
  );
}

  constructor(private loanService: AllappliedloanService, private router: Router) {}

  ngOnInit(): void {
    this.loadLoans(this.currentPage);
  }

  loadLoans(page: number = this.currentPage): void {
    this.loanService.getLoans(page, this.pageSize).subscribe({
      next: (response) => {
        this.loans = response.contents;
        this.totalElements = response.totalElements || 0;
        this.totalPages = response.totalPages || 1;
      },
      error: (err) => {
        console.error('Failed to fetch loans', err);
      }
    });
  }
  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadLoans(this.currentPage);
    }
  }
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadLoans(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadLoans(this.currentPage);
    }
  }
}
