using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Item;
using api.Models;

namespace api.Mappers
{
    public static class ItemMappers
    {
        public static ItemDto ToItemDto(this Item itemModel) {
            return new ItemDto{
                Id = itemModel.Id,
                Name = itemModel.Name,
                Description = itemModel.Description,
                Quantity = itemModel.Quantity,
                Price = itemModel.Price,
                CategoryId = itemModel.CategoryId,
                Category = itemModel.Category != null ? itemModel.Category.ToCategoryDto() : null
            };
        }

        public static Item ToItemFromCreate(this CreateItemDto itemDto) {
            return new Item{
                Name = itemDto.Name,
                Description = itemDto.Description,
                Quantity = itemDto.Quantity,
                Price = itemDto.Price,
                CategoryId = itemDto.CategoryId
            };
        }

        public static Item ToItemFromUpdate(this UpdateItemDto itemDto) {
            return new Item{
                Name = itemDto.Name,
                Description = itemDto.Description,
                Quantity = itemDto.Quantity,
                Price = itemDto.Price,
                CategoryId = itemDto.CategoryId
            };
        }
    }
}