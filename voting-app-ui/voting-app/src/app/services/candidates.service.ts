import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Candidate } from '../models/candidate';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  baseUrl = environment.apiBaseUrl;
  candidates: Candidate[] = [];

  constructor(private http: HttpClient) { }

  getCandidates(){
    return this.http.get<Candidate[]>(this.baseUrl + 'candidates').pipe(
      map((candidates) => {
        this.candidates = candidates;
        return candidates;
      })
    )
  }

  addCandidate(name: string){
    return this.http.post<Candidate>(this.baseUrl+'candidates/'+'add/'+ name,{}).pipe(
      map((candidate) =>{
       
        if(candidate)
        {
           this.candidates.push(candidate);
        }
       
      }), 
    )
  }
}
