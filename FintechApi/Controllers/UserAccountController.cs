using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FintechApi.Data;
using FintechApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FintechApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserAccountsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public UserAccountsController(AppDbContext db)
        {
            _db = db;
        }

        // GET: api/UserAccounts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserAccountModel>>> GetAll()
        {
            var account = await _db.UserAccounts.ToListAsync();
            return Ok(account);
        }

        // GET: api/UserAccounts/{id}
        [HttpGet("{id:int}")]
        public async Task<ActionResult<UserAccountModel>> GetById(int id)
        {
            var account = await _db.UserAccounts.FindAsync(id);
            if (account == null)
                return NotFound();

            return Ok(account);
        }

        // POST: api/UserAccounts
        [HttpPost]
        public async Task<ActionResult<UserAccountModel>> Create(UserAccountModel account)
        {
            // Add the new account to the DbContext
            _db.UserAccounts.Add(account);
            await _db.SaveChangesAsync();

            return Ok();
        }

        // PUT: api/UserAccounts/{id}
        [HttpPut("{id:int}")]
        public async Task<ActionResult<IEnumerable<UserAccountModel>>> Update(int id, UserAccountModel updatedAccount)
        {
            var existingAccount = await _db.UserAccounts.FindAsync(id);
            if(existingAccount == null)
            {
                return NotFound();
            }

            existingAccount.UserAccountType = updatedAccount.UserAccountType;
            existingAccount.AccountName = updatedAccount.AccountName;
            existingAccount.CurrentBalance = updatedAccount.CurrentBalance;
            existingAccount.ModifiedAt = updatedAccount.ModifiedAt;

            await _db.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/UserAccounts/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var account = await _db.UserAccounts.FindAsync(id);
            if (account == null)
                return NotFound(); 

            // Remove the account
            _db.UserAccounts.Remove(account);
            await _db.SaveChangesAsync();

            return NoContent(); 
        }
    }
}
