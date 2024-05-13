import { Injectable } from '@angular/core';
import { Voter } from '../models/voter';
import { map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VotersService {

  baseUrl = environment.apiBaseUrl;
  voters: Voter[] = [];
  votersNoVoted: Voter[] = [];

  constructor(private http: HttpClient) { }



  getVoters() {
    if (this.voters.length > 0) return of(this.voters);
    return this.http.get<Voter[]>(this.baseUrl + 'voters').pipe(
      map((voters) => {
        this.voters = voters;
        return voters;
      })
    )
  }
  getVotersNoVoted(init: boolean = false) {
    if (this.votersNoVoted.length > 0 && !init) return of(this.votersNoVoted);
    return this.http.get<Voter[]>(this.baseUrl + 'voters/novoted').pipe(
      map((votersNoVoted) => {
        this.votersNoVoted = votersNoVoted;
        return votersNoVoted;
      })
    )
  }
  addVoter(name: string) {
    return this.http.post<Voter>(this.baseUrl + 'voters/' + 'add/' + name, {}).pipe(
      map((voter) => {

        if (voter) {
          this.voters.push(voter);
          this.votersNoVoted.push(voter);
        }

      }),
    )
  }

  updateVoters(id: number) {
    this.votersNoVoted.forEach((value, index) => {
      if (value.id == id) this.votersNoVoted.splice(index, 1);
    })

    var voterToUpdate = this.voters.find(v => v.id == id);
    var idx = this.voters.indexOf(voterToUpdate as Voter);
    this.voters[idx].voted = true;

  }

}