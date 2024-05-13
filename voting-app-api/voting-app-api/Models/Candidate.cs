using System.ComponentModel.DataAnnotations;

namespace voting_app_api.Models
{
    public class Candidate
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int Votes { get; set; }
        public List<Voter>? VoterList { get; set; }
    }
}
