namespace FintechApi.Models
{
    public class UserModel
    {
        public int Id { get; set; }  
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string Address { get; set; } = "";
        public string Email { get; set; } = "";
        public string Username { get; set; } = "";
        public string? ProfilePicture { get; set; } = null;

        // For password storage
        public byte[] PasswordHash { get; set; } = Array.Empty<byte>();
        public byte[] PasswordSalt { get; set; } = Array.Empty<byte>();
    }
}
