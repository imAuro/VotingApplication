import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { of } from 'rxjs';

import { CandidatesComponent } from './candidates.component';
import { CandidatesService } from '../services/candidates.service';
import { Candidate } from '../models/candidate';

describe('CandidatesComponent', () => {
  let component: CandidatesComponent;
  let fixture: ComponentFixture<CandidatesComponent>;
  let mockCandidateService: jasmine.SpyObj<CandidatesService>;
  const mockForm = <NgForm>{
   
      reset: () => {}
        
   
};

  beforeEach(async () => {
    mockCandidateService = jasmine.createSpyObj('CandidatesService', ['getCandidates', 'addCandidate']);

    await TestBed.configureTestingModule({
      declarations: [CandidatesComponent],
      imports: [FormsModule],
      providers: [
        { provide: CandidatesService, useValue: mockCandidateService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCandidates on init', () => {
    const mockCandidates: Candidate[] = [{ id: 1, name: 'Candidate A', votes: 0 }, {
      id: 2, name: 'Candidate B', votes: 0
    }];
    mockCandidateService.getCandidates.and.returnValue(of(mockCandidates));

    component.ngOnInit();

    expect(mockCandidateService.getCandidates).toHaveBeenCalled();
    expect(component.candidates$).toBeDefined();
    if (component.candidates$) { // Check if candidates$ is defined
      component.candidates$.subscribe(candidates => {
        expect(candidates).toEqual(mockCandidates);
      });
    }
  });

});
