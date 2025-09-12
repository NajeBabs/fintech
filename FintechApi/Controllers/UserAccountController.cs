using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FintechApi.Data;
using FintechApi.Models;
using System.Security.Claims;

namespace FintechApi.Controllers
{
    [Authorize] // 🔒 Require authentication for all endpoints
    [ApiController]
    [Route("api/[controller]")]
    public class UserAccountsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public UserAccountsController(AppDbContext db)
        {
            _db = db;
        }

        // 🔹 Helper: Get logged-in user’s ID from JWT
        private int GetUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.Parse(userIdClaim!);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserAccountModel>>> GetAll()
        {
            var userId = GetUserId();
            var accounts = await _db.UserAccounts
                                    .Where(a => a.UserId == userId)
                                    .ToListAsync();
            return Ok(accounts);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<UserAccountModel>> GetById(int id)
        {
            var userId = GetUserId();
            var account = await _db.UserAccounts
                                   .FirstOrDefaultAsync(a => a.Id == id && a.UserId == userId);

            if (account == null)
                return NotFound("No user account found.");

            return Ok(account);
        }

        [HttpPost]
        public async Task<ActionResult<UserAccountModel>> Create([FromBody] UserAccountModel account)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState); // return validation errors

            var userId = GetUserId();
            account.UserId = userId;
            account.CreatedAt = DateTime.Now;

            _db.UserAccounts.Add(account);
            await _db.SaveChangesAsync();

            return Ok(account);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UserAccountModel updatedAccount)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = GetUserId();
            var existingAccount = await _db.UserAccounts
                                        .FirstOrDefaultAsync(a => a.Id == id && a.UserId == userId);

            if (existingAccount == null)
                return NotFound();

            existingAccount.AccountName = updatedAccount.AccountName;
            existingAccount.AccountForm = updatedAccount.AccountForm;
            existingAccount.UserAccountType = updatedAccount.UserAccountType;
            existingAccount.ProviderName = updatedAccount.ProviderName;
            existingAccount.CurrentBalance = updatedAccount.CurrentBalance;
            existingAccount.ModifiedAt = DateTime.Now;

            // save the updated
            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = GetUserId();
            var account = await _db.UserAccounts
                                   .FirstOrDefaultAsync(a => a.Id == id && a.UserId == userId);

            if (account == null)
                return NotFound();

            _db.UserAccounts.Remove(account);

            // save the changes
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
