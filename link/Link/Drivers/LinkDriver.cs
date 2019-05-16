
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
using MySql.Data.EntityFrameworkCore.Extensions;
using link.Domains;
using System.Collections.Generic;

namespace link.Drivers
{
  public class Link
  {
    public int id { get; set; }
    public int user_id { get; set; }
    public int friend_id { get; set; }
  }

  public class LinkContext : DbContext
  {
    public DbSet<Link> Links { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseMySQL(
        new MySqlConnectionStringBuilder
        {
          Server = "localhost",
          Database = "link",
          UserID = "root",
          Password = "root",
          SslMode = MySqlSslMode.Required,
        }.ConnectionString
      );
    }
  }
  public class LinkDriver
  {
    public void Init()
    {
      using (var context = new LinkContext())
      {
        context.Database.ExecuteSqlCommand(@"
          CREATE TABLE IF NOT EXISTS Links
            (
              id int PRIMARY KEY AUTO_INCREMENT,
              user_id int,
              friend_id int,
              UNIQUE(user_id, friend_id)
            );
        ");
      }
    }

    virtual public async void Register(int user, int friend)
    {
      using (var context = new LinkContext())
      {
        await context.Links.AddAsync(new Link { user_id = user, friend_id = friend });
        await context.SaveChangesAsync();
      }
    }

    virtual public List<UserId> FindAllByUserId(int userId) {
      using (var context = new LinkContext())
      {
        return context.Links.ToList()
          .Where(link => link.user_id == userId)
          .Select(link => new UserId(link.friend_id))
          .ToList();
      }
    }
  }
}
