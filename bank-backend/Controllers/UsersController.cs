using Microsoft.AspNetCore.Mvc;
using bank_backend.Models;
using bank_backend.Services;
using System.Text.Json;
using System.Text.Json.Serialization;
namespace bank_backend.Controllers;

/// <summary>
/// controller performing CRUD operations
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly UserService _userService;
    public UsersController(UserService userService)
    {
        _userService = userService;
    }

    /*
        GET https://localhost:7055/api/users
        returns all users in the collection
    */
    /// <summary>
    /// Gets all users
    /// </summary>
    [HttpGet]
    public async Task<List<User>> Get() =>
        await _userService.GetAsync();

    /*
        GET https://localhost:7055/api/users/50
        returns a user with matching id
    */
    /// <summary>
    /// Find a user by id
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> Get(string id)
    {
        var user = await _userService.GetAsync(id);
        if(user is null)
        {
            return NotFound();
        }
        return user;
    }

    /*
        POST https://localhost:7055/api/users
        creates a user
    */
    /// <summary>
    /// Add a user to the collection
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> Post(User user)
    {
        await _userService.CreateAsync(user);
        return Ok();
    }

    /*
        PUT https://localhost:7055/api/users/50
        updates a user with matching id
    */
    /// <summary>
    /// Update a user with id
    /// </summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, User userIn)
    {
        var user = await _userService.GetAsync(id);
        if(user is null)
        {
            return NotFound();
        }
        userIn.Id = user.Id;

        await _userService.UpdateAsync(id, userIn);
        return NoContent();
    }

    /*
        DELETE https://localhost:7055/api/users/50
        deletes a user with matching id
    */
    /// <summary>
    /// Delete a user by id
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var user = await _userService.GetAsync(id);
        if(user is null)
        {
            return NotFound();
        }
        await _userService.RemoveAsync(user.Id);
        return NoContent();
    }


    // POST https://localhost:7055/api/users/login
    /// <summary>
    /// Authenticate the user based on username and password
    /// </summary>
    [HttpPost]
    [Route("login")]
    public async Task<ActionResult> Login(Credential credential)
    {
        var userCheck = await _userService.GetAsync(credential.username);
        if(userCheck is not null)
        {
            if(userCheck.password != credential.password)
            {
                return BadRequest(new {error = "Invalid password."});
            }
            // set cookie - account id

            var cookieOptions = new CookieOptions{
                Secure = true,
                HttpOnly = false,
                SameSite = SameSiteMode.None,
            };
            Response.Cookies.Append("accountid",credential.username,cookieOptions);
            return Ok();
        }
        return BadRequest(new { error = "The username does not exist"});
    }

    // POST https://localhost:7055/api/users/logout
    /// <summary>
    /// Expires the user authentication cookie
    /// </summary>
    [HttpPost]
    [Route("logout")]
    public ActionResult Logout()
    {
        Response.Cookies.Delete("accountid");
        return Ok();
    }

    // POST https://localhost:7055/api/users/register
    /// <summary>
    /// Add a new user with unique verification check
    /// </summary>
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register(User user)
    {
        var userCheck = await _userService.GetAsync(user.Id);
        if(userCheck is null)
        {
            await _userService.CreateAsync(user);
            var cookieOptions = new CookieOptions{
                Secure = true,
                HttpOnly = false,
                SameSite = SameSiteMode.None,
            };
            Response.Cookies.Append("accountid",user.Id,cookieOptions);
            return Ok();
        }
        return BadRequest(new { error = "The username already exists."});
    }

    // GET https://localhost:7055/api/users/account
    /// <summary>
    /// returns the authenticated user's data
    /// </summary>
    [HttpGet]
    [Route("account")]
    public async Task<ActionResult<User>> Account()
    {
        var id = Request.Cookies["accountid"];
        if(id is null)
        {
            return BadRequest(new { error = "User needs to be authenticated."});
        }
        var user = await _userService.GetAsync(id);
        if(user is null)
        {
            return BadRequest(new { error = "User needs to be authenticated."});
        }
        return user;
    }
    // POST https://localhost:7055/api/users/init
    // [HttpPost]
    // [Route("init")]
    // public async Task<IActionResult> Init()
    // {
    //     StreamReader r = new StreamReader("./tests/data.json");
    //     string jsonString = r.ReadToEnd();
    //     List<User> users = JsonSerializer.Deserialize<List<User>>(jsonString);
    //     Console.WriteLine(users);
    //     return Ok();
    // }

    // reset the database
    // POST https://localhost:7055/api/users/reset
    /// <summary>
    /// resets the database collection
    /// </summary>
    [HttpPost]
    [Route("reset")]
    public async Task<IActionResult> Reset()
    {
        await _userService.ResetAsync();
        return Ok();
    }

}