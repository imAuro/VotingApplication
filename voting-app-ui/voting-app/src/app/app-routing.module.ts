import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VotersComponent } from './voters/voters.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { VotingComponent } from './voting/voting.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    children: [
      { path: 'voters', component: VotersComponent },
      { path: 'candidates', component: CandidatesComponent },
      { path: 'voting', component: VotingComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
