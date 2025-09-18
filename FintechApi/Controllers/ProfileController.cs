using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FintechApi.Data;
using FintechApi.Dtos;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace FintechApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // JWT required
    public class ProfileController : ControllerBase
    {
        private readonly AppDbContext _db;

        public ProfileController(AppDbContext db)
        {
            _db = db;
        }

        // 🔹 Helper: Get logged-in user’s ID from JWT
        private int GetUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.Parse(userIdClaim!);
        }

        // GET: api/profile
        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
            var userId = GetUserId();
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null) return NotFound("User not found.");

            return Ok(new
            {
                user.FirstName,
                user.LastName,
                user.Email,
                user.Username,
                user.Address,
                ProfilePicture = user.ProfilePicture // optional column
            });
        }

        // PUT: api/profile
        [HttpPut]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto updatedUser)
        {
            var userId = GetUserId();
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null) return NotFound("User not found.");

            // Update text fields only
            user.FirstName = updatedUser.FirstName ?? user.FirstName;
            user.LastName = updatedUser.LastName ?? user.LastName;
            user.Email = updatedUser.Email ?? user.Email;
            user.Address = updatedUser.Address ?? user.Address;

            await _db.SaveChangesAsync();
            return Ok("Profile updated successfully.");
        }

        // PUT: api/profile/password
        [HttpPut("password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
            var userId = GetUserId();
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null) return NotFound("User not found.");

            // verify current password
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(dto.CurrentPassword));
            if (!computedHash.SequenceEqual(user.PasswordHash))
                return BadRequest("Current password is incorrect.");

            // create new password hash
            using var hmacNew = new HMACSHA512();
            user.PasswordSalt = hmacNew.Key;
            user.PasswordHash = hmacNew.ComputeHash(Encoding.UTF8.GetBytes(dto.NewPassword));

            await _db.SaveChangesAsync();
            return Ok("Password changed successfully.");
        }

        // PUT: api/profile/picture
        [HttpPut("picture")]
        public async Task<IActionResult> UpdateProfilePicture([FromForm] UpdateProfilePictureDto dto)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == GetUserId());
            if (user == null) return NotFound("User not found.");

            if (dto.ProfilePicture == null)
                return BadRequest("No file uploaded.");

            var folder = Path.Combine("Uploads", "ProfilePictures");
            if (!Directory.Exists(folder)) Directory.CreateDirectory(folder);

            var fileName = $"{user.Id}_{DateTime.Now.Ticks}{Path.GetExtension(dto.ProfilePicture.FileName)}";
            var path = Path.Combine(folder, fileName);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await dto.ProfilePicture.CopyToAsync(stream);
            }

            user.ProfilePicture = path;
            await _db.SaveChangesAsync();

            return Ok(new { ProfilePicture = user.ProfilePicture });
        }
    }

    // DTO for changing password
    public class ChangePasswordDto
    {
        public string CurrentPassword { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
    }
}
