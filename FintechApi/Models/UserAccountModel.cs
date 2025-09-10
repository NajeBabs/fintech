using System;
using System.ComponentModel.DataAnnotations;

namespace FintechApi.Models
{
    public class UserAccountModel
    {
        public int Id { get; set; }                      // Primary Key (by convention)

        [Required(ErrorMessage = "Account Name is required.")]
        public string AccountName { get; set; }

        [Required(ErrorMessage = "Account Type is required.")]
        public string UserAccountType { get; set; }

        [Required(ErrorMessage = "Provider Name is required.")]
        public string ProviderName { get; set; }
        
        [Required(ErrorMessage = "Balance must be 0 or more.")]
        public decimal CurrentBalance { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now; // Defaults to now

        public DateTime? ModifiedAt { get; set; }         // Nullable → can be empty
    }
}
