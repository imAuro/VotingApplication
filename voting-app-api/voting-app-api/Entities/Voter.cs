using System.ComponentModel.DataAnnotations;

namespace voting_app_api.Entities
{
    public class Voter
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public bool? Voted { get; set; }
    }
}
