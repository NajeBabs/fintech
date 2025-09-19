namespace FintechApi.Dtos
{
    public class UpdateGoalDto
    {
        public string? GoalName { get; set; }
        public decimal? TargetAmount { get; set; }
        public decimal? Amount { get; set; }
        public DateTime? ModifiedAt { get; set; }

        public int? UserId { get; set; }
        public int? UserAccountId { get; set; }
    }
}
