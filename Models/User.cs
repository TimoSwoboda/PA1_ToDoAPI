namespace NewTodoApi.Models;
using Microsoft.AspNetCore.Identity;
public class User : IdentityUser
{
    public new long Id { get; set; }
    public string? Username { get; set; }
    public override string? Email { get; set; }
    public string? Password { get; set; }
    public List<TodoItem>? TodoItems { get; set; }
}