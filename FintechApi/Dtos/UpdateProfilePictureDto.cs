using Microsoft.AspNetCore.Http;

namespace FintechApi.Dtos
{
    public class UpdateProfilePictureDto
    {
        public IFormFile ProfilePicture { get; set; } = null!;
    }
}