namespace FintechApi.Dtos
{
    public class GoalDto
    {
        public int GoalId { get; set; }
        public string GoalName { get; set; } = "";
        public string? LinkedAccount { get; set; }
        public decimal TargetAmount { get; set; }
        public decimal Amount { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }

        public int UserId { get; set; }
        public int UserAccountId { get; set; }
    }
}
