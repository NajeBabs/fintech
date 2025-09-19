using System.ComponentModel.DataAnnotations;

namespace FintechApi.Models
{
    public class UserAccountModel
    {
        public int Id { get; set; } // Primary Key

        [Required(ErrorMessage = "Account name is required.")]
        public string AccountName { get; set; } = "";

        [Required(ErrorMessage = "Account form is required.")]
        public string AccountForm { get; set; } = "";

        [Required(ErrorMessage = "Account type is required.")]
        public string UserAccountType { get; set; } = ""; // e.g., bank, gcash, savings

        [Required(ErrorMessage = "Provider name is required.")]
        public string ProviderName { get; set; } = "";

        [Range(0, double.MaxValue, ErrorMessage = "Balance cannot be negative.")]
        public decimal CurrentBalance { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? ModifiedAt { get; set; }

        // 🔹 Link to logged-in user
        [Required]
        public int UserId { get; set; }
        public UserModel? User { get; set; }

        // ✅ Navigation property
        public ICollection<GoalModel> Goals { get; set; } = null!;
    }
}
