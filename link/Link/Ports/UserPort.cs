using System.Threading.Tasks;
using link.Domains;

namespace link.Port
{
  public interface UserPort
  {
    Task<User> FindUser(Cookie cookie);
  }
}
