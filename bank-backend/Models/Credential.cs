namespace bank_backend.Models;
using System.ComponentModel.DataAnnotations;
public class Credential
{
    [Required]
    public string username { get; set; } = null!;
    [Required]
    public string password { get; set; } = null!;
}
