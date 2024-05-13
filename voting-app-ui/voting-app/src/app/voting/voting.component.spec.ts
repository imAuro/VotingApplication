import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { VotingComponent } from './voting.component';
import { CandidatesService } from '../services/candidates.service';
import { VotersService } from '../services/voters.service';
import { VotingService } from '../services/voting.service';
import { Candidate } from '../models/candidate';
import { Voter } from '../models/voter';
import { voteDto } from '../models/voteDto';

describe('VotingComponent', () => {
  let component: VotingComponent;
  let fixture: ComponentFixture<VotingComponent>;
  let mockVotingService: jasmine.SpyObj<VotingService>;
  let mockCandidatesService: jasmine.SpyObj<CandidatesService>;
  let mockVotersService: jasmine.SpyObj<VotersService>;
  let mockForm: jasmine.SpyObj<NgForm>;

  beforeEach(async () => {
    mockVotingService = jasmine.createSpyObj('VotingService', ['vote']);
    mockCandidatesService = jasmine.createSpyObj('CandidatesService', ['getCandidates']);
    mockVotersService = jasmine.createSpyObj('VotersService', ['getVotersNoVoted', 'updateVoters']);

    await TestBed.configureTestingModule({
      declarations: [ VotingComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: VotingService, useValue: mockVotingService },
        { provide: CandidatesService, useValue: mockCandidatesService },
        { provide: VotersService, useValue: mockVotersService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingComponent);
    component = fixture.componentInstance;
    mockForm = jasmine.createSpyObj('NgForm', ['reset']); // Create spy object for NgForm with reset method
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call vote', () => {
    const mockModel: voteDto = { voterId: 1, candidateId: 2 };
    component.model = mockModel;

    component.vote(mockForm);

    expect(mockVotingService.vote).toHaveBeenCalledWith(mockModel);
    expect(mockVotersService.updateVoters).toHaveBeenCalledWith(mockModel.voterId);
    expect(mockForm.reset).toHaveBeenCalled();
  });

  it('should call ngOnInit and set voters$ and candidates$', () => {
    const mockVoters: Voter[] = [{
      id: 1, name: 'Voter A',
      voted: false
    }, {
      id: 2, name: 'Voter B',
      voted: false
    }];
    const mockCandidates: Candidate[] = [{
      id: 1, name: 'Candidate A',
      votes: 0
    }, {
      id: 2, name: 'Candidate B',
      votes: 0
    }];
    mockVotersService.getVotersNoVoted.and.returnValue(of(mockVoters));
    mockCandidatesService.getCandidates.and.returnValue(of(mockCandidates));

    component.ngOnInit();

    expect(mockVotersService.getVotersNoVoted).toHaveBeenCalledWith(true);
    expect(mockCandidatesService.getCandidates).toHaveBeenCalled();
    expect(component.voters$).toBeDefined();
    expect(component.candidates$).toBeDefined();

    if (component.voters$ && component.candidates$) {
      component.voters$.subscribe(voters => {
        expect(voters).toEqual(mockVoters);
      });

      component.candidates$.subscribe(candidates => {
        expect(candidates).toEqual(mockCandidates);
      });
    }
  });
});
