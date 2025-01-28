using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Item;

namespace api.Dtos.Category
{
    public class CreateCategoryDto
    {
        [Required]
        [MinLength(3, ErrorMessage = "Name must be at least 3 characters")]
        [MaxLength(20, ErrorMessage = "Name cannot be over 20 characters")]
        public string Name { get; set; } = string.Empty;
    }
}