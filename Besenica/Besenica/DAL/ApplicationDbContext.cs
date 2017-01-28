using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Besenica.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
namespace Besenica.DAL
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public DbSet<Country> Countries { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<GameResult> GameResults { get; set; }
        public DbSet<Animal> Animals { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<IdentityRole>().ToTable("AspNetRoles");
            modelBuilder.Entity<IdentityUserRole>().ToTable("AspNetUserRoles");
            modelBuilder.Entity<IdentityUserLogin>().ToTable("AspNetUserLogins");
            modelBuilder.Entity<IdentityUserClaim>().ToTable("AspNetUserClaims");
            modelBuilder.Entity<ApplicationUser>().ToTable("AspNetUsers");

            modelBuilder.Entity<GameResult>()
                .HasKey(e => e.AnswerId);

            modelBuilder.Entity<Answer>()
                .HasOptional(s => s.GameResult) 
                .WithRequired(ad => ad.Answer); 
        }
     


        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}