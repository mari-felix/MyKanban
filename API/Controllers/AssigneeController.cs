using Microsoft.AspNetCore.Mvc;
using SoftKanbanAPI.Models;
using SoftKanbanAPI.Context;
using Microsoft.EntityFrameworkCore;
using SoftKanbanAPI.Migrations;
using Microsoft.AspNetCore.Cors;

namespace SoftKanbanAPI.Controllers
{
    [EnableCors("AllowSpecificOrigin")]
    [ApiController]
    [Route("api/[controller]")]
    public class AssigneeController : ControllerBase
    {
        private readonly KanbanContext _context;

        public AssigneeController(KanbanContext context)
        {
            _context = context;
        }

        [HttpPost("CreateAssignee")]
        public async Task<IActionResult> Create(Assignee assignee)
        {
            _context.Assignees.Add(assignee);
            await _context.SaveChangesAsync();
            return Ok(assignee);
        }

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var assignee = await _context.Assignees.FirstOrDefaultAsync(a => a.Id == id);
            if (assignee == null)
            {
                return NotFound();
            }
            return Ok(assignee);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            List<Assignee> assignees = await _context.Assignees.ToListAsync();
            
            if (assignees == null)
            {
                return NotFound();
            }
            return Ok(assignees);
        }


        [HttpPut("EditAssignee/{id}")]
        public async Task<IActionResult> Edit(Assignee assignee, int id)
        {
            var assigneeDb = await _context.Assignees.FirstOrDefaultAsync(a => a.Id == id);
            if (assigneeDb == null)
            {
                return NotFound();
            }

            assigneeDb.Name = assignee.Name;
            assigneeDb.Job = assignee.Job;
            assigneeDb.Email = assignee.Email;

            _context.Assignees.Update(assigneeDb);
            await _context.SaveChangesAsync();
            return Ok(assigneeDb);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var assignee = await _context.Assignees.FindAsync(id);
            if (assignee == null)
            {
                return NotFound();
            }

            _context.Assignees.Remove(assignee);
            await _context.SaveChangesAsync();
            return Ok(assignee);
        }
    }

}
