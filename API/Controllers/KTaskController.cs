using Microsoft.AspNetCore.Mvc;
using SoftKanbanAPI.Models;
using SoftKanbanAPI.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;

namespace SoftKanbanAPI.Controllers
{
    [EnableCors("AllowSpecificOrigin")]
    [ApiController]
    [Route("api/Task")]
    public class KTaskController : ControllerBase
    {
        private readonly KanbanContext _context;

        public KTaskController(KanbanContext context) {
            _context = context;
        }

        [HttpPost("CreateTask")]
        public async Task<IActionResult> Create(KTask task)
        {

            task.CreatedDate = DateTime.Now;
            task.UpdatedDate = DateTime.Now;
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return Ok(task);
        }

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id) 
        {
            var task = await _context.Tasks.FirstOrDefaultAsync(x => x.Id == id);

            if (task == null) 
            {
                return NotFound();
            }

            return Ok(task);
        }
        
        [HttpGet]
        public async Task<IActionResult> GetAll() 
        {
            List<KTask> tasks = await _context.Tasks.ToListAsync();

            if (tasks == null) 
            {
                return NotFound();
            }

            return Ok(tasks);
        }


        [HttpPut("EditTask/{id}")]
        public async Task<IActionResult> EditTask(KTask task, int id) {
            var taskDb = await _context.Tasks.FirstOrDefaultAsync(x => x.Id == id);

            if (task == null) {
                return NotFound();
            }

            taskDb.Title = task.Title;
            taskDb.Status = task.Status;
            taskDb.AssigneeId = task.AssigneeId;
            taskDb.Description = task.Description;
            taskDb.UpdatedDate = DateTime.Now;

            _context.Tasks.Update(taskDb);
            await _context.SaveChangesAsync();

            return Ok(taskDb);
        }

        [HttpDelete("DeleteTask/{id}")]
        public async Task<IActionResult> DeleteTask(int id) {
            var task = await _context.Tasks.FirstOrDefaultAsync(x => x.Id == id);

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return Ok(task);
        }


    }
}
