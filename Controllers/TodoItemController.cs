using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewTodoApi.Models;

namespace NewTodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemController : ControllerBase
    {
        private readonly TodoContext _db;

        public TodoItemController(TodoContext context)
        {
            _db = context;
        }

        [HttpPost("CreateNewTodo")]
        public IActionResult CreateTodoItem(TodoItem todoItem)
        {
            try
            {
                _db.TodoItems.Add(todoItem);
                SetCreatedDate(todoItem);
                _db.SaveChanges();

                return CreatedAtAction(nameof(GetTodoItemById), new { id = todoItem.Id }, todoItem);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while creating the todo item: {ex.Message}");
            }
        }

        [HttpGet("id")]
        public IActionResult GetTodoItemById(long id)
        {
            try
            {
                TodoItem? itemFromDb = _db.TodoItems.Find(id);
                if (itemFromDb == null)
                {
                    return NotFound();
                }

                return Ok(itemFromDb);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while fetching the todo item: {ex.Message}");
            }
        }

        [HttpGet("name")]
        public IActionResult GetTodoItemByName(string name)
        {
            try
            {
                TodoItem? itemFromDb = _db.TodoItems.SingleOrDefault(TodoItem => TodoItem.Name == name);
                if (itemFromDb == null)
                {
                    return NotFound();
                }
                return Ok(itemFromDb);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while fetching the todo item: {ex.Message}");
            }
        }

        [HttpGet("todoItems")]
        public IActionResult GetTodoItems()
        {
            try
            {
                var todoItems = _db.TodoItems.Where(TodoItem => TodoItem.IsComplete == false).ToList();
                if (todoItems == null || todoItems.Count == 0)
                {
                    return NotFound();
                }
                return Ok(todoItems);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while fetching the todo items: {ex.Message}");
            }
        }

        [HttpGet("completedItems")]
        public IActionResult GetCompletedItems()
        {
            try
            {
                var completedItems = _db.TodoItems.Where(TodoItem => TodoItem.IsComplete == true).ToList();
                if (completedItems == null || completedItems.Count == 0)
                {
                    return NotFound();
                }
                return Ok(completedItems);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while fetching the completed items: {ex.Message}");
            }
        }

        [HttpGet("sortedPrioritys")]
        public IActionResult GetSortedPrioritys()
        {
            try
            {
                var sortedPrioritys = _db.TodoItems.Where(TodoItem => TodoItem.IsComplete == false).OrderBy(TodoItem => TodoItem.Priority).ToList();
                if (sortedPrioritys == null || sortedPrioritys.Count == 0)
                {
                    return NotFound();
                }
                return Ok(sortedPrioritys);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while fetching the sorted priority items: {ex.Message}");
            }
        }

        [HttpGet("sortedPrioritysDescending")]
        public IActionResult GetSortedPrioritysDescending()
        {
            try
            {
                var sortedPrioritysDescending = _db.TodoItems.Where(TodoItem => TodoItem.IsComplete == false).OrderByDescending(TodoItem => TodoItem.Priority).ToList();
                if (sortedPrioritysDescending == null || sortedPrioritysDescending.Count == 0)
                {
                    return NotFound();
                }
                return Ok(sortedPrioritysDescending);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while fetching the sorted priority items in descending order: {ex.Message}");
            }
        }

        [HttpGet("sortedDeadlines")]
        public IActionResult GetSortedDeadline()
        {
            try
            {
                var sortedDeadlines = _db.TodoItems.Where(TodoItem => TodoItem.IsComplete == false).OrderBy(TodoItem => TodoItem.Deadline).ToList();
                if (sortedDeadlines == null || sortedDeadlines.Count == 0)
                {
                    return NotFound();
                }
                return Ok(sortedDeadlines);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while fetching the sorted deadlines: {ex.Message}");
            }
        }

        [HttpGet("sortedDeadlinesDescending")]
        public IActionResult GetSortedDeadlineDescending()
        {
            try
            {
                var sortedDeadlinesDescending = _db.TodoItems.Where(TodoItem => TodoItem.IsComplete == false).OrderByDescending(TodoItem => TodoItem.Deadline).ToList();
                if (sortedDeadlinesDescending == null || sortedDeadlinesDescending.Count == 0)
                {
                    return NotFound();
                }
                return Ok(sortedDeadlinesDescending);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while fetching the sorted deadlines in descending order: {ex.Message}");
            }
        }

        [HttpPut("edit")]
        public IActionResult UpdateTodoItem(TodoItem todoItem)
        {
            try
            {
                var existingTodoItem = _db.TodoItems.Find(todoItem.Id);
                if (existingTodoItem == null)
                {
                    return NotFound();
                }

                _db.Entry(existingTodoItem).CurrentValues.SetValues(todoItem);
                _db.SaveChanges();

                return Ok("Update was Successful");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while updating the todo item: {ex.Message}");
            }
        }

        [HttpDelete("delete")]
        public IActionResult DeleteTodoItem(long id)
        {
            try
            {
                var existingTodoItem = _db.TodoItems.Find(id);
                if (existingTodoItem == null)
                {
                    return NotFound();
                }

                _db.TodoItems.Remove(existingTodoItem);
                _db.SaveChanges();

                return Ok("Item Deleted");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while deleting the todo item: {ex.Message}");
            }
        }

        [HttpPost("AssignTask")]
        public IActionResult AssignTask(int UserId, int TodoId)
        {
            try
            {
                var user = _db.Users.FirstOrDefault(u => u.Id == UserId);
                if (user == null)
                {
                    return NotFound($"User with ID {UserId} not found.");
                }

                var todoItem = _db.TodoItems.FirstOrDefault(t => t.Id == TodoId);
                if (todoItem == null)
                {
                    return NotFound($"TodoItem with ID {TodoId} not found.");
                }

                if (user.TodoItems == null)
                {
                    user.TodoItems = new List<TodoItem>();
                }

                todoItem.user = user;
                user.TodoItems.Add(todoItem);

                _db.SaveChanges();

                return Ok("TodoItem was assigned successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while assigning the task: {ex.Message}");
            }
        }

        [HttpGet("GetAssignedTasks")]
        public IActionResult GetAssignedTasks(int id)
        {
            try
            {
                var user = _db.Users.FirstOrDefault(u => u.Id == id);

                if (user == null)
                {
                    return NotFound("User not found");
                }

                var todos = user.TodoItems?.ToList();

                return Ok(todos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while fetching assigned tasks: {ex.Message}");
            }
        }

        private void SetCreatedDate(TodoItem todoItem)
        {
            todoItem.Taskcreated = DateTime.Today;
        }
    }
}
