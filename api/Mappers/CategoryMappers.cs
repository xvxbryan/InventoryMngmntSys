using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Category;
using api.Models;

namespace api.Mappers
{
    public static class CategoryMappers
    {
        public static CategoryDto ToCategoryDto(this Category categoryModel) {
            return new CategoryDto{
                Id = categoryModel.Id,
                Name = categoryModel.Name
            };
        }

        public static Category ToCategoryFromCreate(this CreateCategoryDto categoryDto) {
            return new Category{
                Name = categoryDto.Name
            };
        }

        public static Category ToCategoryFromUpdate(this UpdateCategoryDto categoryDto) {
            return new Category{
                Name = categoryDto.Name
            };
        }
    }
}