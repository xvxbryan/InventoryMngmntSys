using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Item;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class ItemRepository : IItemRepository
    {
        private readonly ApplicationDBContext _context;
        public ItemRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Item> CreateAsync(Item itemModel)
        {
            await _context.Items.AddAsync(itemModel);
            await _context.SaveChangesAsync();
            return itemModel;
        }

        public async Task<List<Item>> GetAllAsync()
        {
            return await _context.Items.ToListAsync();
        }

        public async Task<Item?> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Item?> UpdateAsync(int id, UpdateItemDto itemModel)
        {
            throw new NotImplementedException();
        }
    }
}