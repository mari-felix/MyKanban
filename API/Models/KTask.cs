namespace SoftKanbanAPI.Models
{
    public class KTask
    {
        public int Id { get; set; }
        public int AssigneeId { get; set; }
        public string Title { get; set; }
        public Status Status { get; set; }
        public Priority Priority { get; set; }
        public string Description { get; set; }
        public DateTime ExpectedDue { get; set; }
        public DateTime CreatedDate { get; set;}
        public DateTime UpdatedDate { get; set;}

    }
}
