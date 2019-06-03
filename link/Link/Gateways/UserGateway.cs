using link.Domains;
using link.Port;
using link.Drivers;
using System.Threading.Tasks;

namespace link.Gateway
{
  public class UserGateway: UserPort
  {

    public UserDriver userDriver;
    virtual public async Task<User> FindUser(Cookie cookie)
    {
      var entity = await userDriver.Identify(cookie.value);
      return new User(new UserId(entity.id), new LoginName(entity.loginName));
    }
  }
}
