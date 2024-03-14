namespace NewTodoApi.Models;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

public class TodoItem
{
    public long Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }

    [Required(ErrorMessage = "Priority is required.")]
    [Range(1, 5, ErrorMessage = "Priority has to be between 1 and 5.")]
    public long Priority { get; set; }
    public DateTime Taskcreated { get; set; }
    public DateTime Deadline { get; set; }
    public bool IsComplete { get; set; } = false;

    [JsonIgnore]
    public User? user { get; set; }
}