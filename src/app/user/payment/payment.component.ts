import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentService } from 'src/app/services/payemi/payemi.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
submitHandler($event: SubmitEvent) {
throw new Error('Method not implemented.');
}
  stripe: any;
  elements: any;
  card: any;
  amount: number = 0;
emiId:any="";
    constructor( private route: ActivatedRoute, private router:Router, private payementService:PaymentService) {}

  async ngOnInit() {
      // Get the query parameter `schemeId` from the URL
      this.route.queryParams.subscribe(params => {
        this.amount = params['amount'];
        this.emiId = params['emiId'];
        if (!this.amount) {
          console.error('Loan scheme ID is missing.');
        }
      });
    this.stripe = await loadStripe('pk_test_51QclP3P2dfRpkybIgEJQUBhpAxSHac20ICZTOkSISGRtsUeGf9Nbx5Tn0ijyZJLEnPWpHP66V7NDDUkmJt57tMej00MedgNSdo');
    this.elements = this.stripe.elements();
    this.card = this.elements.create('card');
    this.card.mount('#card-element');
  }

  async handlePayment() {
    const stripe_secret_key = "sk_test_51QclP3P2dfRpkybIDbWEKP4p6sBupQXvwPI8GZAhOtdPNfEqmXgtBQGzHkd2cYN1gBOcxluzNY2CXhhFQa76w2xK004NhU0hF2";
    if (this.amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);

    const response = await fetch('http://localhost:8080/api/payment/create-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ amount: this.amount }),
    });
    this.payementService.makePayment(this.emiId).subscribe({
      next:(response) => {
       alert('Payment successful!');
           this.router.navigateByUrl('/viewEmi');
      }
     })
    const chargeId = await response.text();
    console.log(chargeId);

    if (!chargeId || !chargeId.startsWith('ch_')) {
      console.error('Invalid chargeId:', chargeId);
      return;
    }

    const result = await this.stripe.confirmCardPayment(stripe_secret_key, {
      payment_method: {
        card: this.card,
      },
    });

 

    if (result.error) {
      console.log("Error: " + result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        alert('Payment successful!');
        this.router.navigateByUrl('/viewEmi');
        
        console.log('Payment successful!');
        alert('payment success')
      }
    }
  }
}





// payment.component.ts
// import { HttpClient } from '@angular/common/http';
// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { Router } from '@angular/router';
// import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';

// @Component({
//   selector: 'app-payment',
//   templateUrl: './payment.component.html',
//   styleUrls: ['./payment.component.css']
// })
// export class PaymentComponent implements OnInit {
  
// amount: any;
//   async handlePayment() {
//     const stripe_secret_key = "sk_test_51QastOD8e7FPtoIfAPwNgOp6gmGNyCeus11HLiBH8FIIdjpTGUMHdauuol2EbuRrshomSAcn8gtXladr13ilhP0B00vKau1nlQ";
//     if (this.amount <= 0) {
//       alert('Please enter a valid amount.');
//       return;
//     }
//   }

//   @ViewChild('payBtn') payBtn!: ElementRef<HTMLInputElement>;
//   stripe: Stripe | null = null;
//   elements!: StripeElements;
//   cardNumber!: any;
//   cardExpiry!: any;
//   cardCvc!: any;

//   emiInfo = JSON.parse(localStorage.getItem('emiInfo')!) || {};
//   user = JSON.parse(localStorage.getItem('token')!);
//   // shippingInfo = JSON.parse(localStorage.getItem('shippingInfo')!);
//   // cartItems = JSON.parse(localStorage.getItem('cartItems')!);

//   constructor(
//     private router: Router,
//     private http: HttpClient,
//     // private toastr: ToastrService
//   ) {}

//   async ngOnInit() {
//     // Load Stripe
//     this.stripe = await loadStripe('pk_test_51QastOD8e7FPtoIf5ENSb8nuwh6GFRwbyBU5A6WQ55sjusHTCGOGl1e2qm2TfmdGSSs2m2Us4uydmDWTZZNLznNd00gO3Xq0tx');
    
//     if (this.stripe) {
//       this.elements = this.stripe.elements(); // Initialize elements after Stripe is loaded

//       this.cardNumber = this.elements.create('cardNumber');
//       this.cardNumber.mount('#card-number-element');

//       this.cardExpiry = this.elements.create('cardExpiry');
//       this.cardExpiry.mount('#card-expiry-element');

//       this.cardCvc = this.elements.create('cardCvc');
//       this.cardCvc.mount('#card-cvc-element');
//     } else {
//       console.error('Stripe failed to load');
//     }
//   }

//   async submitHandler(event: Event) {
//     event.preventDefault();

//     // Disable the button to prevent multiple submissions
//     this.payBtn.nativeElement.disabled = true;

//     const paymentData = {
//       amount: Math.round(this.orderInfo.totalPrice * 100), // Convert to cents
//     };

//     // Backend API call to create payment intent and get a secret key
//     const response = await fetch('http://localhost:8080/api/payment/create-payment', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         // Ensure that you pass the token here if needed
//         'Authorization': `Bearer ${this.user.token}`,
//       },
//       body: JSON.stringify({ amount: paymentData.amount }),
//     });

//     const { secret_key } = await response.json();  // Assuming the secret key is returned in the response
//     if (!secret_key) {
//       console.error('Failed to retrieve secret key');
//       return;
//     }

//     // Use Stripe's confirmCardPayment method to process the payment
//     if (this.stripe && this.cardNumber && this.cardExpiry && this.cardCvc) {
//       const result = await this.stripe.confirmCardPayment(secret_key, {
//         payment_method: {
//           card: this.cardNumber,
//         },
//       });

//       if (result.error) {
//         // Handle error here
//         console.log("Error: " + result.error.message);
//       } else {
//         if (result.paymentIntent.status === 'succeeded') {
//           alert('Payment successful!');
//           console.log('Payment successful!');
//           // Optionally, you can redirect the user to another page or update the UI
//         }
//       }
//     } else {
//       console.error('Stripe elements or payment method not correctly initialized.');
//     }

//     // Re-enable the button after payment is complete
//     this.payBtn.nativeElement.disabled = false;
//   }
// }
