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
        public DbSet<UserModel> Users => Set<UserModel>();   // 👈 Add this
    }
}
