using System;
using System.ComponentModel.DataAnnotations;

namespace AIOFT.User.Data.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiry { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string ResetCode { get; set; }
        public string Address { get; set; }
        public bool IsNewUser {get; set; }
        public bool IsActive { get; set; }
    }
}
