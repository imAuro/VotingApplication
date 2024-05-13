using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using voting_app_api.Controllers.Controllers;
using voting_app_api.Entities;

namespace voting_app_api.Controllers
{
    public class VotersController : BaseApiController
    {

        public VotersController(DataContext context) : base(context) { }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Voter>>> GetVoters()
        {
            try
            {
                return Ok(await _dataContext.Voters.ToListAsync());
            }
            catch
            {
                return Problem(detail: "Some error occured", statusCode: 500);
            }
        }

        [HttpGet("novoted")]
        public async Task<ActionResult<IEnumerable<Voter>>> GetVotersWhoNotVote()
        {
            try
            {
                return Ok(await _dataContext.Voters.Where(v => v.Voted != true).ToListAsync());
            }
            catch
            {
                return Problem(detail: "Some error occured", statusCode: 500);
            }
        }

        [HttpPost("add/{name}")]
        public async Task<ActionResult<Candidate>> AddVoter(string name)
        {

            try
            {
                if (string.IsNullOrWhiteSpace(name)) return BadRequest("Name cannot be empty");
                if (await _dataContext.Voters.AnyAsync(c => c.Name == name)) return BadRequest("Voter already exsists");
                Voter voter = new Voter()
                {
                    Name = name
                };
                _dataContext.Voters.Add(voter);
                await _dataContext.SaveChangesAsync();
                return Ok(voter);
            }
            catch
            {
                return Problem(detail: "Some error occured", statusCode: 500);
            }

        }



    }
}
