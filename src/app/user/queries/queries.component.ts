import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QueryService } from 'src/app/services/queries/query.service';
import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css'],
})
export class QueriesComponent implements OnInit {

  @Output() loanSubmitted = new EventEmitter<void>();
  uploadForm!: FormGroup;
  userId: any;
  query: any;

  constructor(
    private fb: FormBuilder, 
    private enquiryService: QueryService,
    private route: ActivatedRoute // Inject ActivatedRoute to access query parameters
  ) {
    this.uploadForm = this.fb.group({
      question: ['', Validators.required],  // Adding the 'question' control
      querytype: ['', Validators.required],  // Adding the 'querytype' control
    });
  }

  ngOnInit(): void {
    // Get the query parameter `userId` from the URL
    // this.route.queryParams.subscribe(params => {
    //   this.userId = params['userId'];
    //   if (!this.userId) {
    //     console.error('user ID is missing.');
    //   }
    // });
  }
  

  onSubmit(): void {
    if (this.uploadForm.valid ) {
      const formData = new FormData();
      formData.append('question', this.uploadForm.value.question);
      formData.append('querytype', this.uploadForm.value.querytype);
  
      // Call the service to submit the query with the userId
      this.enquiryService.submitQuery(this.uploadForm.value).subscribe(
        (response) => {
          console.log('Query submitted successfully:', response);
          alert('Your query has been submitted successfully.');
          this.uploadForm.reset(); // Optionally reset the form after submission
        },
        (error) => {
          console.error('Error submitting query:', error);
          alert('Failed to submit query. Please try again.');
        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }
}  

// queryRequest = {
//   question: '',
//   querytype: '',
 
// };

// submittedQueries: any[] = [];


// constructor(private queryService: QueryService) {}

// ngOnInit(): void {}

// submitQuery(): void {
//   this.queryService.submitQuery(this.queryRequest).subscribe(
//     (response) => {
//       alert('Query submitted successfully');
//       this.queryRequest = { question: '', querytype: '' };
//     },
//     (error) => {
//       console.error('Error submitting query', error);
//       alert('Failed to submit query');
//     }
//   );
// }

// getSubmittedQueries(): void {
//   this.queryService.getSubmittedQueries().subscribe(
//     (response) => {
//       this.submittedQueries = response;
//       // Use Bootstrap's Modal class to show the modal
//       const modalElement = document.getElementById('queryModal');
//       if (modalElement) {
//         const modalInstance = new bootstrap.Modal(modalElement);
//         modalInstance.show();
//       }
//     },
//     (error) => {
//       console.error('Error fetching queries', error);
//     }
//   );
// }
// }