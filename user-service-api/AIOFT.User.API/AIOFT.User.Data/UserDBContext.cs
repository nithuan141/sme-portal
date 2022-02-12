
using System;
using Microsoft.EntityFrameworkCore;
using AIOFT.User.Data.Models;
using System.Configuration;

namespace AIOFT.User.Data
{
    public partial class UserDBContext : DbContext
    {
        public UserDBContext()
        {
        }

        public UserDBContext(DbContextOptions<UserDBContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // optionsBuilder.UseSqlServer("Data Source=localhost\\SQLEXPRESS; Initial Catalog=SME; Integrated Security=True;");
        }

        public virtual DbSet<Models.User> User { get; set; }
        public virtual DbSet<Models.Course> Courses { get; set; }
        public virtual DbSet<Models.Comments> Comments { get; set; }
        public virtual DbSet<Models.CourseHistory> CourseHistory { get; set; }
        public virtual DbSet<Models.Investment> Investment { get; set; }
        public virtual DbSet<Models.ProfitPaid> ProfitPaid { get; set; }
    }
}
