using Microsoft.EntityFrameworkCore;

namespace BuggyApp.Models;

public class BuggyAppContext : DbContext
{
    public BuggyAppContext(DbContextOptions<BuggyAppContext> options)
        : base(options)
    {
    }

    public DbSet<Item> items { get; set; } = null!;
}