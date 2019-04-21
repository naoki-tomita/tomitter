using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using link.Usecases;
using link.Gateway;
using link.Drivers;
using link.Domains;
using Microsoft.AspNetCore.Http;
using System.Runtime.Serialization.Json;
using System.IO;
using System.Runtime.Serialization;

namespace Link.Controllers
{
  [Route("v1/[controller]")]
  [ApiController]
  public class LinksController : Controller
  {
    private LinkUsecase linkUsecase;

    public LinksController() {
      linkUsecase = new LinkUsecase();
      linkUsecase.linkPort = new LinkGateway();
      (linkUsecase.linkPort as LinkGateway).linkDriver = new LinkDriver();
      linkUsecase.userPort = new UserGateway();
      (linkUsecase.userPort as UserGateway).userDriver = new UserDriver();
    }

    // GET v1/links
    [HttpGet]
    async public Task<ActionResult<IEnumerable<LinkIdJson>>> Get()
    {
      var linksUserIds = await linkUsecase.ListLinks(new Cookie(HttpContext.Request.Headers["cookie"]));
      return linksUserIds.Select(link => new LinkIdJson { id = link.value }).ToList();
    }

    // GET v1/links/5
    [HttpGet("{id}")]
    public ActionResult<string> Get(int id)
    {
      return "value";
    }


    private readonly DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(LinkIdJson));
    // POST v1/linkss
    [HttpPost]
    public void Post()
    {
      var cookie = new Cookie(HttpContext.Request.Headers["cookie"]);
      var body = serializer.ReadObject(HttpContext.Request.Body) as LinkIdJson;
      linkUsecase.Link(cookie, new UserId(body.id));
    }

    // PUT api/values/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE api/values/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }

  [DataContract]

  public class LinkIdJson {
    [DataMember]

    public int id;
  }
}
