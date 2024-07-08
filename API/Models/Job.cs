using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace SoftKanbanAPI.Models
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum Job
    {
        Developer,
        Manager,
        Sales
    }
}