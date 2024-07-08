using Microsoft.EntityFrameworkCore;
using SoftKanbanAPI.Models;

namespace SoftKanbanAPI.Context
{
    public class KanbanContext : DbContext
    {
        public KanbanContext(DbContextOptions<KanbanContext> options) : base(options) { }

        public DbSet<Assignee> Assignees { get; set; }

        public DbSet<KTask> Tasks { get; set; }
    }
}
