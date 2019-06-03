namespace link.Domains
{
  public class User
  {
    public UserId id;
    public LoginName loginName;

    public User(UserId id, LoginName loginName)
    {
      this.id = id;
      this.loginName = loginName;
    }
  }

  public class UserId
  {
    public int value;
    public UserId(int value)
    {
      this.value = value;
    }
  }

  public class LoginName
  {
    public string value;
    public LoginName(string value)
    {
      this.value = value;
    }
  }
}
