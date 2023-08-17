namespace bank_backend.Models;
using System.ComponentModel.DataAnnotations;
public class EmergencyContact
{
    [Required(AllowEmptyStrings = true)]
    public string name { get; set; } = null!;
    [Required(AllowEmptyStrings = true)]
    public string relationship { get; set; } = null!;
    [Required(AllowEmptyStrings = true)]
    public string phone { get; set; } = null!;
}