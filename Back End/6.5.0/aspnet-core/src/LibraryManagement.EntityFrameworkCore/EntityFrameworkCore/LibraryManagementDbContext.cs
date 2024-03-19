using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using LibraryManagement.Authorization.Roles;
using LibraryManagement.Authorization.Users;
using LibraryManagement.MultiTenancy;
using LibraryManagement.Domains;

namespace LibraryManagement.EntityFrameworkCore
{
    public class LibraryManagementDbContext : AbpZeroDbContext<Tenant, Role, User, LibraryManagementDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Book> Books { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Person> Persons { get; set; }
        public DbSet<Librarian> Librarians { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<BookOnTransaction> BooksOnTransactions { get; set; }
        public DbSet<GenreOnBook> GenresOnBooks { get; set; }
        public LibraryManagementDbContext(DbContextOptions<LibraryManagementDbContext> options)
            : base(options)
        {
        }
    }
}
