using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Item;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/item")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemRepository _itemRepo;
        private readonly ICategoryRepository _categoryRepo;


        public ItemController(IItemRepository itemRepo, ICategoryRepository categoryRepo)
        {
            _itemRepo = itemRepo;
            _categoryRepo = categoryRepo;
        }

        [HttpGet("get")]
        // This function will return a specific category from the database according to its Id
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query) {
            var item = await _itemRepo.GetAllAsync(query);
            return Ok(item.ToList());
        }

        [HttpGet("get/{id}")]
        // This function will return a specific category from the database according to its Id
        public async Task<IActionResult> GetById([FromRoute] int id) {
            var item = await _itemRepo.GetByIdAsync(id);
            if(item == null) {
                return NotFound();
            }
            return Ok(item.ToItemDto());
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateAsync([FromBody] CreateItemDto itemDto) {
            if(!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            var itemModel = itemDto.ToItemFromCreate();
            var category = await _categoryRepo.GetByIdAsync(itemDto.CategoryId);
            itemModel.Category = category;
            await _itemRepo.CreateAsync(itemModel);
            return CreatedAtAction(nameof(GetById), new { id = itemModel.Id }, itemModel.ToItemDto());
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] UpdateItemDto itemDto) {
            if(!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            var itemModel = await _itemRepo.UpdateAsync(id, itemDto);
            if(itemModel == null) {
                return NotFound();
            }

            return Ok(itemModel.ToItemDto());
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteAsync([FromRoute] int id) {
            var item = await _itemRepo.DeleteAsync(id);
            if(item == null) {
                return NotFound();
            }
            return NoContent();
        }
    }
}