using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FintechApi.Models;
using FintechApi.Dtos;
using FintechApi.Data;

namespace FintechApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GoalController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GoalController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/goal
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GoalDto>>> GetGoals()
        {
            var goals = await _context.Goals
                .Include(g => g.User)
                .Include(g => g.UserAccount)
                .Select(g => new GoalDto
                {
                    GoalId = g.GoalId,
                    GoalName = g.GoalName,
                    TargetAmount = g.TargetAmount,
                    Amount = g.Amount,
                    CreatedAt = g.CreatedAt,
                    ModifiedAt = g.ModifiedAt,
                    UserId = g.UserId,
                    UserAccountId = g.UserAccountId
                }).ToListAsync();

            return Ok(goals);
        }

        // GET: api/goal/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<GoalDto>> GetGoal(int id)
        {
            var goal = await _context.Goals
                .Include(g => g.User)
                .Include(g => g.UserAccount)
                .FirstOrDefaultAsync(g => g.GoalId == id);

            if (goal == null) return NotFound();

            return new GoalDto
            {
                GoalId = goal.GoalId,
                GoalName = goal.GoalName,
                TargetAmount = goal.TargetAmount,
                Amount = goal.Amount,
                CreatedAt = goal.CreatedAt,
                ModifiedAt = goal.ModifiedAt,
                UserId = goal.UserId,
                UserAccountId = goal.UserAccountId
            };
        }

        // POST: api/goal
        [HttpPost]
        public async Task<ActionResult<GoalDto>> CreateGoal(CreateGoalDto dto)
        {
            var goal = new GoalModel
            {
                GoalName = dto.GoalName,
                TargetAmount = dto.TargetAmount,
                Amount = dto.Amount,
                CreatedAt = DateTime.Now,
                UserId = dto.UserId,
                UserAccountId = dto.UserAccountId
            };

            _context.Goals.Add(goal);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetGoal), new { id = goal.GoalId }, new GoalDto
            {
                GoalId = goal.GoalId,
                GoalName = goal.GoalName,
                TargetAmount = goal.TargetAmount,
                Amount = goal.Amount,
                CreatedAt = goal.CreatedAt,
                ModifiedAt = goal.ModifiedAt,
                UserId = goal.UserId,
                UserAccountId = goal.UserAccountId
            });
        }

        // PUT: api/goal/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGoal(int id, UpdateGoalDto dto)
        {
            var goal = await _context.Goals.FindAsync(id);
            if (goal == null) return NotFound();

            if (!string.IsNullOrEmpty(dto.GoalName))
                goal.GoalName = dto.GoalName;

            if (dto.TargetAmount.HasValue)
                goal.TargetAmount = dto.TargetAmount.Value;

            if (dto.Amount.HasValue)
                goal.Amount = dto.Amount.Value;

            if (dto.UserId.HasValue)
                goal.UserId = dto.UserId.Value;

            if (dto.UserAccountId.HasValue)
                goal.UserAccountId = dto.UserAccountId.Value;

            goal.ModifiedAt = DateTime.Now;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/goal/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGoal(int id)
        {
            var goal = await _context.Goals.FindAsync(id);
            if (goal == null) return NotFound();

            _context.Goals.Remove(goal);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
