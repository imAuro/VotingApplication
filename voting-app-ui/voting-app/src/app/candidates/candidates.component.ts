import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from '../models/candidate';
import { NgForm } from '@angular/forms';
import { CandidatesService } from '../services/candidates.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent {
  candidates$: Observable<Candidate[]> | undefined;
  model: any = {};

  constructor(private candidateService: CandidatesService) { }

  ngOnInit(): void {
    this.candidates$ = this.candidateService.getCandidates();
  }

  addCandidate(addForm: NgForm) {
    if (this.model.name != undefined)
      this.candidateService.addCandidate(this.model.name).subscribe();
    addForm.reset();
  }
}
