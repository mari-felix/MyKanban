namespace SoftKanbanAPI.Models
{
    public class Assignee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Job Job {  get; set; }
        public string Email { get; set; }
    }
}
