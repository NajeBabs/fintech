namespace FintechApi.Models
{
    public class UserAccountModel
    {
        public int Id { get; set; }                      // Primary Key (by convention)
        public string AccountName { get; set; } = "";     // Account name
        public string AccountForm { get; set; } = "";     // Account form
        public string UserAccountType { get; set; } = ""; // e.g., bank, gcash, savings
        public string ProviderName { get; set; } = "";     // Provider Name
        public decimal CurrentBalance { get; set; }       // DECIMAL(15,2)
        public DateTime CreatedAt { get; set; } = DateTime.Now; // Defaults to now
        public DateTime? ModifiedAt { get; set; }         // Nullable → can be empty
    }
}
