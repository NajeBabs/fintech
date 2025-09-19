using Microsoft.EntityFrameworkCore;
using FintechApi.Models;

namespace FintechApi.Data
{
    // AppDbContext: The EF Core gateway to your database
    public class AppDbContext : DbContext
    {
        // This constructor lets ASP.NET inject options (like the connection string)
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // 🔹 Your tables
        public DbSet<UserAccountModel> UserAccounts => Set<UserAccountModel>();
        public DbSet<UserModel> Users => Set<UserModel>();
        public DbSet<GoalModel> Goals => Set<GoalModel>();

         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure relationship for Goals → Users
            modelBuilder.Entity<GoalModel>()
                .HasOne(g => g.User)
                .WithMany(u => u.Goals)
                .HasForeignKey(g => g.UserId)
                .OnDelete(DeleteBehavior.Restrict); // <— Add this

            // Configure relationship for Goals → UserAccounts
            modelBuilder.Entity<GoalModel>()
                .HasOne(g => g.UserAccount)
                .WithMany(ua => ua.Goals)
                .HasForeignKey(g => g.UserAccountId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
