import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  // Provide default values to avoid "Property ... has no initializer" errors
  loanAmt: number = 0;
  interestRate: number = 0;
  loanDuration: number = 0;
  emi: number = 0;

  constructor() { }

  ngOnInit(): void {
    // Any initialization logic
  }

  // Called when user clicks "Calculate"
  calculateLoan(): void {
    const principal = this.loanAmt;
    const duration = this.loanDuration;
    const rate = this.interestRate;

    // toFixed(...) returns a string, so convert it back to a number
    this.emi = +this.emi_calculator(principal, rate, duration).toFixed(2);
  }

  // EMI formula
  emi_calculator(p: number, r: number, t: number): number {
    // Monthly interest rate
    r = r / (12 * 100);
    // Total number of months
    t = t * 12;

    // EMI formula
    const emi = (p * r * Math.pow(1 + r, t)) / (Math.pow(1 + r, t) - 1);
    return emi;
  }
}
