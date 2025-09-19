using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FintechApi.Models
{
    public class GoalModel
    {
        [Key]
        public int GoalId { get; set; }   // Primary Key

        [Required]
        [MaxLength(100)]
        public string GoalName { get; set; } = "";

        [Required]
        [Column(TypeName = "decimal(15,2)")]
        public decimal TargetAmount { get; set; }

        [Required]
        [Column(TypeName = "decimal(15,2)")]
        public decimal Amount { get; set; }   // Current progress

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? ModifiedAt { get; set; }

        // Foreign keys
        [Required]
        public int UserId { get; set; }
        public UserModel? User { get; set; }

        [Required]
        public int UserAccountId { get; set; }
        public UserAccountModel? UserAccount { get; set; }
    }
}
