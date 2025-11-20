using System.ComponentModel.DataAnnotations;

namespace ToDoList.api.Models
{
    public class TodoItem
    {
        // El "número de serie" interno para la base de datos. Esencial.
        public long Id { get; set; }

        // El texto principal del recordatorio (ej: "Hacer tarea")
         // Esto hace que el campo sea obligatorio
        public string? Title { get; set; }

        // Las notas adicionales (ej: "Capítulo 5 del libro")
        public string? Notes { get; set; }

        // El círculo de completado (true = completado, false = pendiente)
        public bool IsComplete { get; set; }

        // --- Campos Adicionales (los que estarían en el botón "i") ---

        // La fecha de vencimiento. El '?' significa que es opcional.
        public DateTime? DueDate { get; set; }

        // Prioridad: 0=Baja, 1=Media, 2=Alta. 
        public int Priority { get; set; }

        // Fecha en que se creó el recordatorio, útil para ordenar.
        public DateTime CreatedDate { get; set; }


        // Constructor para poner valores por defecto al crear una nueva tarea
        public TodoItem()
        {
            Title = string.Empty; // Aseguramos que no sea nulo
            Notes = string.Empty;
            IsComplete = false;
            Priority = 0; // Prioridad baja por defecto
            CreatedDate = DateTime.UtcNow; // Se pone la fecha y hora actual
        }
    }
}