using Microsoft.EntityFrameworkCore;
using ToDoList.api.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

// 1. Añadimos la configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontendApp",
        builder =>
        {
            builder.AllowAnyOrigin()   // Permite CUALQUIER origen (para desarrollo)
                   .AllowAnyMethod()   // Permite CUALQUIER método (GET, POST, PUT, DELETE)
                   .AllowAnyHeader();  // Permite CUALQUIER encabezado
        });
});

// --- ¡INICIO DEL CAMBIO! ---
// BORRAMOS el bloque de UseInMemoryDatabase y lo REEMPLAZAMOS por esto:

// 1. Obtener la cadena de conexión (que pondremos en appsettings.json)
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// 2. Configurar el DbContext para usar SQL Server (Azure SQL)
builder.Services.AddDbContext<TodoContext>(opt =>
    opt.UseSqlServer(connectionString));
// --- FIN DEL CAMBIO! ---


var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();



//app.UseHttpsRedirection();
app.UseCors("AllowFrontendApp");
app.MapControllers();
app.Run();