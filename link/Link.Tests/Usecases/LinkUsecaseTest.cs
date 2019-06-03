using System;
using Xunit;
using Moq;
using link.Domains;
using link.Port;
using System.Threading.Tasks;

namespace link.Usecases.Test
{
  public class LinkUsecaseTest
  {
    [Fact]
    public async Task Linkを作成する()
    {
      var target = new LinkUsecase();
      var cookie = new Cookie("foo");
      var user = new User(new UserId(1), new LoginName("foo"));
      var friendId = new UserId(1);
      var userGateway = new Mock<UserPort>();
      var linkGateway = new Mock<LinkPort>();
      target.linkPort = linkGateway.Object;
      target.userPort = userGateway.Object;

      userGateway.Setup(m => m.FindUser(cookie)).ReturnsAsync(user);
      linkGateway.Setup(m => m.Register(user.id, friendId));

      await target.Link(cookie, friendId);

      userGateway.Verify(m => m.FindUser(cookie));
      linkGateway.Verify(m => m.Register(user.id, friendId));
    }
  }
}
