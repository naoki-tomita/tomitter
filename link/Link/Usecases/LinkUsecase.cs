using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using link.Domains;
using link.Port;

namespace link.Usecases
{
  public class LinkUsecase
  {
    public LinkPort linkPort;
    public UserPort userPort;

    public async Task Link(Cookie cookie, UserId friendId)
    {
      var user = await userPort.FindUser(cookie);
      linkPort.Register(user.id, friendId);
    }

    public void Unlink(Cookie cookie, UserId unfriendId)
    {
      throw new System.NotImplementedException("error");
    }

    public async Task<List<UserId>> ListLinks(Cookie cookie)
    {
      var user = await userPort.FindUser(cookie);
      return linkPort.FindAllByUserId(user.id);
    }
  }
}
