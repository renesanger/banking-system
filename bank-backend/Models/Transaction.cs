namespace bank_backend.Models;
using System.ComponentModel.DataAnnotations;
public class Transaction
{
    public int tid { get; set; }
    public int amount { get; set; }
    public DateTime date { get; set; }
    public string description { get; set; } = null!;

}