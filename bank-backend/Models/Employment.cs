namespace bank_backend.Models;
using System.ComponentModel.DataAnnotations;
public class Employment
{
    public string company { get; set; } = null!;
    public string phone { get; set; } = null!;
    public string title { get; set; } = null!;
}