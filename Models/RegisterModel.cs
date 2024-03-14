namespace NewTodoApi;

public class RegisterModel
{
    public string? Username { get; set; }
    public string? Email { get; set; }
    public string? EmailConfirmation { get; set; }
    public string? Password { get; set; }
    public string? PasswordConfirmation { get; set; }
}