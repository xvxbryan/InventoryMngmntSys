using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Item;
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

        public ItemController(IItemRepository itemRepo)
        {
            _itemRepo = itemRepo;
        }

        [HttpGet]
        [Route("get/{id}")]
        // This function will return a specific category from the database according to its Id
        public async Task<IActionResult> GetById([FromRoute] int id) {
            var item = await _itemRepo.GetByIdAsync(id);
            if(item == null) {
                return NotFound();
            }
            return Ok(item.ToItemDto());
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateAsync([FromBody] CreateItemDto itemDto) {
            if(!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            var itemModel = itemDto.ToItemFromCreate();
            await _itemRepo.CreateAsync(itemModel);
            return CreatedAtAction(nameof(GetById), new { id = itemModel.Id }, itemModel.ToItemDto());
        }
        
    }
}