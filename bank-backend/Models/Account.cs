namespace bank_backend.Models;
using System.ComponentModel.DataAnnotations;
public class Account
{
    // account number
    public string id { get; set; } = null!;
    public string routing { get; set; } = null!;
    // types of account - saving, checking, college, retirement
    [Required]
    public string type { get; set; } = null!;
    [Required]
    public double balance { get; set; }


    public static string SelectRouting()
    {
        List<string> optionList = new List<string>
            { "021000021",  "071000013", "111000614", "075000019"};

        var rand = new Random();
        return optionList[rand.Next(4)];
    }
}

