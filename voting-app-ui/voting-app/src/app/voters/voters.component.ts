import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Voter } from '../models/voter';
import { VotersService } from '../services/voters.service';

@Component({
  selector: 'app-voters',
  templateUrl: './voters.component.html',
  styleUrls: ['./voters.component.css']
})
export class VotersComponent implements OnInit {
  voters$: Observable<Voter[]> | undefined;
  model: any = {};

  constructor(private votersService: VotersService) { }

  ngOnInit(): void {
    this.voters$ = this.votersService.getVoters();
  }

  addVoter(addForm: NgForm) {
    if (this.model.name != undefined)
      this.votersService.addVoter(this.model.name).subscribe();
    addForm.reset();
  }

}
