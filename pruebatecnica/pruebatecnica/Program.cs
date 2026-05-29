using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using pruebatecnica.Data;
using pruebatecnica.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// === 1. CONTROLADORES Y CONFIGURACIÓN BASE ===
builder.Services.AddControllers(); // Se queda solo uno aquí arriba
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

// === 2. BASE DE DATOS ===
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// === 3. SEGURIDAD: JWT ===
var jwtKey = builder.Configuration["Jwt:Key"] ?? throw new Exception("JWT Key missing");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddScoped<JwtService>();

// === 4. CORS PARA REACT ===
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "Mi API v1");

        options.RoutePrefix = "swagger";
    });
}



// 1° CORS siempre va primero para que el navegador no bloquee nada
app.UseCors("ReactApp");

// 2° Redirección HTTPS antes de validar tokens
app.UseHttpsRedirection();

// 3° Seguridad en orden lógico: Primero sé quién eres, luego veo tus permisos
app.UseAuthentication();
app.UseAuthorization();

// 4° Mapeo de rutas final
app.MapControllers();

app.Run();