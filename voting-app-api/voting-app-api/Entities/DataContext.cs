using Microsoft.EntityFrameworkCore;

namespace voting_app_api.Entities
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options): base(options)
        {
            
        }

        public DbSet<Candidate> Candidates{ get; set; }
        public DbSet<Voter> Voters { get; set; }

    }
}
