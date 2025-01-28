using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions)
        {
            
        }
        // This allows Categories to be called from with the Repository to reference the database
        public DbSet<Category> Categories { get; set; }
        public DbSet<Item> Items { get; set; }
    }
}