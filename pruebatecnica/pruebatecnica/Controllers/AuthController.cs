using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pruebatecnica.Data;
using pruebatecnica.DTOs;
using pruebatecnica.Services;
using Microsoft.EntityFrameworkCore; 
using BCrypt.Net; 

namespace pruebatecnica.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly JwtService _jwtService;

        public AuthController(AppDbContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return Unauthorized(new { message = "Credenciales inválidas" });

            var token = _jwtService.GenerateToken(user);
            return Ok(new { token, user = new { user.Email, user.Role } });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword()
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == "admin@test.com");
            if (user == null) return NotFound("Usuario no existe");
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123");
            await _context.SaveChangesAsync();
            return Ok("Contraseña actualizada");
        }

    }
}
