import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { voteDto } from '../models/voteDto'


@Injectable({
  providedIn: 'root'
})
export class VotingService {
  baseUrl = environment.apiBaseUrl;


  constructor(private http: HttpClient, private toastr: ToastrService) { }

  vote(vote: voteDto){
    var voteDto=vote;
    this.http.put(this.baseUrl + "voting", voteDto).subscribe( result => {
      if(result){
      this.toastr.success("Vote has been added!", "Success")
      }
    });
  }
  
}
