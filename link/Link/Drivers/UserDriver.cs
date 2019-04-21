
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
using MySql.Data.EntityFrameworkCore.Extensions;
using link.Domains;
using System.Collections.Generic;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Threading.Tasks;

namespace link.Drivers
{

  public class UserEntity {
    public int id;
    public string loginName;
  }

  public class UserDriver {
    private readonly HttpClient client = new HttpClient();
    private readonly DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(UserEntity));

    public async Task<UserEntity> Identify(string cookie) {
      client.DefaultRequestHeaders.Add("cookie", cookie);
      var stream = await client.GetStreamAsync("http://localhost/v1/users/identify");
      return serializer.ReadObject(stream) as UserEntity;
    }
  }
}
