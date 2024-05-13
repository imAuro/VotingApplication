using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using voting_app_api.DTOs;
using voting_app_api.Controllers.Controllers;
using voting_app_api.Entities;

namespace voting_app_api.Controllers
{
    public class VotingController : BaseApiController
    {
        public VotingController(DataContext context) : base(context)
        {

        }

        [HttpPut]
        public async Task<ActionResult<bool>> Vote(VoteDto voteDto)
        {
            try
            {
                var voter = await _dataContext.Voters.SingleOrDefaultAsync(v => v.Id == voteDto.VoterId);
                var candidate = await _dataContext.Candidates.SingleOrDefaultAsync(c => c.Id == voteDto.CandidateId);
                if (voter == null) return BadRequest("Voter does not exists");
                if (candidate == null) return BadRequest("Candidate does not exists");

                voter.Voted = true;
                _dataContext.Entry(voter).State = EntityState.Modified;
                candidate.Votes += 1;
                _dataContext.Entry(candidate).State = EntityState.Modified;
                await _dataContext.SaveChangesAsync();
                return Ok(true);
            }
            catch
            {
                return Problem(detail: "Some error occured", statusCode: 500);
            }

        }

    }
}
