using System.Collections.Generic;
using link.Domains;

namespace link.Port
{
  public interface LinkPort
  {
    void Register(UserId user, UserId linkedUser);
    List<UserId> FindAllByUserId(UserId user);
  }
}
