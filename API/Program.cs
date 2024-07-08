using Newtonsoft.Json.Converters;
using SoftKanbanAPI.Context;
using Microsoft.EntityFrameworkCore;
using SoftKanbanAPI.Models;
using Microsoft.OpenApi.Models;
using Microsoft.OpenApi.Any;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("SqliteSoftrio");
builder.Services.AddDbContext<KanbanContext>(options =>
    options.UseSqlite(connectionString));

builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.Converters.Add(new StringEnumConverter());
    });


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder
            .AllowAnyHeader() // Permitir quaisquer cabeçalhos personalizados
            .AllowAnyMethod() // Permitir qualquer método HTTP (GET, POST, PUT, DELETE, etc.)
            .AllowAnyOrigin());
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c => {

    c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });

});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
    });
}

app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
