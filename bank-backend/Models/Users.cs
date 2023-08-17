using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace bank_backend.Models;

public class User
{
    [BsonId]
    
    //[BsonRepresentation(BsonType.ObjectId)]

    // id will be username
    [Required]
    public string Id { get; set; } = null!;
    [Required]
    public string password { get; set; } = null!;
    [Required]
    public string firstName { get; set; } = null!;
    [Required]
    public string lastName { get; set; } = null!;
    public string? middleName { get; set; } = null!;
    [Required]
    public string email { get; set; } = null!;
    [Required]
    public DateTime dateOfBirth { get; set; } 
    [Required]
    public string phoneNumber { get; set; } = null!;
    [Required]
    public string socialSecurityNumber { get; set; } = null!;
    [Required]
    public string address { get; set; } = null!;
    [Required]
    public string city { get; set; } = null!;
    [Required]
    public string state { get; set; } = null!;
    [Required]
    public string zipcode { get; set; } = null!;
    public Account account { get; set; } = null!;
    public Employment employment { get; set; } = null!;
    public EmergencyContact firstContact { get; set; } = null!;
    public EmergencyContact? secondContact { get; set; } = null!;
    public Transaction[] transactions { get; set; } = null!;
}