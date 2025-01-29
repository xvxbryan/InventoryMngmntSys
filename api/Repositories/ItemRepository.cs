using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Item;
using api.Interfaces;
using api.Mappers;
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

        public async Task<Item?> DeleteAsync(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if(item == null) {
                return null;
            }
            _context.Items.Remove(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<List<Item>> GetAllAsync()
        {
            return await _context.Items.Include(c => c.Category).ToListAsync();
        }

        public async Task<Item?> GetByIdAsync(int id)
        {
            return await _context.Items.Include(i => i.Category).FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<Item?> UpdateAsync(int id, UpdateItemDto itemModel)
        {
            var item = await _context.Items.Include(i => i.Category).FirstOrDefaultAsync(i => i.Id == id);
            if(item == null) {
                return null;
            }

            item.Name = itemModel.Name;
            item.Description = itemModel.Description;
            item.Quantity = itemModel.Quantity;
            item.Price = itemModel.Price;
            item.CategoryId = itemModel.CategoryId;

            await _context.SaveChangesAsync();
            return item;
        }
    }
}