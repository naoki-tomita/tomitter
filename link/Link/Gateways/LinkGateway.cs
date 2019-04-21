using link.Domains;
using link.Port;
using link.Drivers;
using System.Collections.Generic;

namespace link.Gateway
{
  public class LinkGateway : LinkPort
  {

    public LinkDriver linkDriver;
    virtual public void Register(UserId user, UserId linkedUser)
    {
      linkDriver.Register(user.value, linkedUser.value);
    }

    virtual public List<UserId> FindAllByUserId(UserId user) {
      return linkDriver.FindAllByUserId(user.value);
    }
  }
}
