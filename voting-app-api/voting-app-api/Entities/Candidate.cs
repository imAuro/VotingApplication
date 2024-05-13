using System.ComponentModel.DataAnnotations;

namespace voting_app_api.Entities
{
    public class Candidate
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int Votes {  get; set; }
    }
}
