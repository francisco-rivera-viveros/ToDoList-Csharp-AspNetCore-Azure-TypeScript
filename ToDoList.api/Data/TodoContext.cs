using Microsoft.EntityFrameworkCore;
using ToDoList.api.Models; // <-- Importante: jala nuestro modelo

namespace ToDoList.api.Data
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options)
        {
        }

        // Esto crea una "tabla" en la base de datos llamada TodoItems
        // que contendrá todos nuestros objetos TodoItem.
        public DbSet<TodoItem> TodoItems { get; set; } = null!;
    }
}