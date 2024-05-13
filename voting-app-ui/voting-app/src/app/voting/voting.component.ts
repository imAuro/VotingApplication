import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Candidate } from '../models/candidate';
import { Voter } from '../models/voter';
import { CandidatesService } from '../services/candidates.service';
import { VotersService } from '../services/voters.service';
import { VotingService } from '../services/voting.service';
import { voteDto } from '../models/voteDto';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit {
  voters$: Observable<Voter[]> | undefined;
  candidates$: Observable<Candidate[]> | undefined;
  model: voteDto = { voterId: -1, candidateId: -1 };

  constructor(private votingService: VotingService, private candidatesService: CandidatesService, private votersService: VotersService) { }

  ngOnInit(): void {
    this.voters$ = this.votersService.getVotersNoVoted(true);
    this.candidates$ = this.candidatesService.getCandidates();
  }


  vote(form: NgForm) {
    if (this.model.candidateId === -1 || this.model.voterId === -1)
      return;
    this.votingService.vote(this.model);
    this.votersService.updateVoters(this.model.voterId);
    this.resetModel();
  }


  resetModel() {
    this.model = { voterId: -1, candidateId: -1 }
  }

}

