using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Category;

namespace api.Dtos.Item
{
    public class UpdateItemDto
    {
        [Required]
        [MinLength(3, ErrorMessage = "Name must be at least 3 characters")]
        [MaxLength(20, ErrorMessage = "Name cannot be over 20 characters")]
        public string Name { get; set; } = string.Empty;
        [Required]
        [MinLength(3, ErrorMessage = "Name must be at least 3 characters")]
        [MaxLength(100, ErrorMessage = "Name cannot be over 20 characters")]
        public string Description { get; set; } = string.Empty;
        [Required]
        [Range(1, 9999)]
        public int Quantity { get; set; }
        [Required]
        [Range(0.01, 999999999)]
        public decimal Price { get; set; }
        public int CategoryId { get; set; }
    }
}