using BuggyApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace BuggyApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InvoiceController : ControllerBase
{
    private static readonly Item[] items =
    [
        new Item{Name="C++", Price=2.0}, new Item{Name="Python", Price=5.00}, new Item{Name="Golang", Price=9.00}
    ];

    [HttpGet]
    public IEnumerable<Item> Get()
    {
        List<Item> items = null;
        if (items == null || items.Count == 0)
        {
            return (IEnumerable<Item>)NotFound("No invoice found");
        }
        return (IEnumerable<Item>)Ok(new { items });
    }
}
