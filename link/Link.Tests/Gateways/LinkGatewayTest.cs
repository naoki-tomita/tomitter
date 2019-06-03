using System;
using Xunit;
using Moq;
using link.Domains;
using link.Gateway;
using link.Drivers;

namespace link.Gateway.Test
{
  public class LinkGatewayTest
  {
    [Fact]
    public void Linkを作成する()
    {
      var target = new LinkGateway();
      var cookie = new Cookie("foo");
      var user = new User(new UserId(1), new LoginName("foo"));
      var friendId = new UserId(1);
      var linkDriver = new Mock<LinkDriver>();
      target.linkDriver = linkDriver.Object;

      linkDriver.Setup(m => m.Register(1, 2));

      target.Register(new UserId(1), new UserId(2));

      linkDriver.Verify(m => m.Register(1, 2));
    }
  }
}
