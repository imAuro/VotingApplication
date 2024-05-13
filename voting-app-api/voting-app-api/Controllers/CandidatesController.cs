using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using voting_app_api.Controllers.Controllers;
using voting_app_api.Entities;
namespace voting_app_api.Controllers
{
    public class CandidatesController : BaseApiController
    {

        public CandidatesController(DataContext context) : base(context) { }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Voter>>> GetCandidates()
        {
            try
            {
                return Ok(await _dataContext.Candidates.OrderByDescending(c => c.Votes).ToListAsync());
            }
            catch
            {
                return Problem(detail: "Some error occured", statusCode: 500);
            }
        }

        [HttpPost("add/{name}")]
        public async Task<ActionResult<Candidate>> AddCandidate(string name)
        {
            try
            {

                if (string.IsNullOrWhiteSpace(name)) return BadRequest("Name cannot be empty");
                if (await _dataContext.Candidates.AnyAsync(c => c.Name == name)) return BadRequest("Candidate already exsists");
                Candidate candidate = new Candidate()
                {
                    Name = name
                };
                _dataContext.Candidates.Add(candidate);
                await _dataContext.SaveChangesAsync();
                return Ok(candidate);
            }
            catch
            {
                return Problem(detail: "Some error occured", statusCode: 500);
            }

        }

    }
}
