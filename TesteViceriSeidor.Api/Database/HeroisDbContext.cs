using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;
using TesteViceriSeidor.Api.Models;

namespace TesteViceriSeidor.Api.Database
{
    public class HeroisDbContext : DbContext
    {
        public DbSet<Heroi> Herois { get; set; }
        public DbSet<Superpoder> Superpoderes { get; set; }

        public HeroisDbContext(DbContextOptions<HeroisDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Heroi>()
                .HasMany(left => left.Superpoderes)
                .WithMany(right => right.Herois)
                .UsingEntity(
                    "HeroisSuperpoderes",
                    l => l.HasOne(typeof(Superpoder)).WithMany().HasForeignKey("SuperpoderId").HasPrincipalKey(nameof(Superpoder.Id)),
                    r => r.HasOne(typeof(Heroi)).WithMany().HasForeignKey("HeroiId").HasPrincipalKey(nameof(Heroi.Id)),
                    j => j.HasKey("HeroiId", "SuperpoderId"));
        }
    }
}
