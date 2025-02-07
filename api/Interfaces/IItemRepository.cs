using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Item;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IItemRepository
    {
        Task<List<Item>> GetAllAsync(QueryObject query);
        Task<Item?> GetByIdAsync(int id);
        Task<Item> CreateAsync(Item itemModel);
        Task<Item?> UpdateAsync(int id, UpdateItemDto itemModel);
        Task<Item?> DeleteAsync(int id);
    }
}