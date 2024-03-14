using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using NewTodoApi.Models;
using Microsoft.AspNetCore.Cors;

namespace NewTodoApi
{
    [EnableCors("AbCors")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;

        public UserController(SignInManager<User> signInManager, UserManager<User> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var result = await _signInManager.PasswordSignInAsync(model.Email!, model.Password!, false, lockoutOnFailure: false);
                    if (result.Succeeded)
                    {
                        return Ok("Logged in");
                    }
                    else
                    {
                        return BadRequest("False Information");
                    }
                }

                return BadRequest("Invalid model");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while logging in: {ex.Message}");
            }
        }

        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                await _signInManager.SignOutAsync();
                return Ok("Signed Out");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while logging out: {ex.Message}");
            }
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var user = new User
                    {
                        Username = model.Username,
                        Email = model.Email
                    };

                    var result = await _userManager.CreateAsync(user, model.Password!);
                    if (result.Succeeded)
                    {
                        return Ok("User registered successfully");
                    }
                    else
                    {
                        return BadRequest("Failed to register user");
                    }
                }
                return BadRequest("Invalid model");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while registering: {ex.Message}");
            }
        }
    }
}
