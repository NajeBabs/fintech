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
            var accountList = await _db.UserAccounts.ToListAsync();

            if (!accountList.Any())
                return Ok("No user accounts found.");
            
            return Ok(accountList);
        }

        // GET: api/UserAccounts/{id}
        [HttpGet("{id:int}")]
        public async Task<ActionResult<UserAccountModel>> GetById(int id)
        {
            var account = await _db.UserAccounts.FindAsync(id);
            if (account == null)
                return NotFound("No user account found.");

            return Ok(account);
        }

        // POST: api/UserAccounts
        [HttpPost]
        public async Task<ActionResult<UserAccountModel>> Create(UserAccountModel newAccount)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Add the new account to the DbContext
            _db.UserAccounts.Add(newAccount);

            // save the new account
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = newAccount.Id}, newAccount);
        }

        // PUT: api/UserAccounts/{id}
        [HttpPut("{id:int}")]
        public async Task<ActionResult<IEnumerable<UserAccountModel>>> Update(int id, UserAccountModel updatedAccount)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingAccount = await _db.UserAccounts.FindAsync(id);
            if(existingAccount == null)
            {
                return NotFound();
            }

            existingAccount.UserAccountType = updatedAccount.UserAccountType;
            existingAccount.AccountName = updatedAccount.AccountName;
            existingAccount.CurrentBalance = updatedAccount.CurrentBalance;
            existingAccount.ProviderName = updatedAccount.ProviderName;
            existingAccount.ModifiedAt = updatedAccount.ModifiedAt;

            // save the updated
            await _db.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/UserAccounts/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var account = await _db.UserAccounts.FindAsync(id);
            if (account == null)
                return NotFound(); 

            // Remove the account
            _db.UserAccounts.Remove(account);

            // save the changes
            await _db.SaveChangesAsync();

            return NoContent(); 
        }
    }
}
