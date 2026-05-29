using System.ComponentModel.DataAnnotations;

namespace pruebatecnica.modelos
{
    public class Product
    {
        public int Id { get; set; }
        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;
        [MaxLength(500)]
        public string? Description { get; set; }
        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }
        [Range(0, int.MaxValue)]
        public int Stock { get; set; }
        [Required, MaxLength(50)]
        public string Type { get; set; } = string.Empty;
    }
}
