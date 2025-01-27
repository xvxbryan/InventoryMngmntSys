using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Category;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepo;

        public CategoryController(ICategoryRepository categoryRepo)
        {
            _categoryRepo = categoryRepo;
        }

        [HttpGet]
        [Route("get")]
        // This function will return all categories from the database
        public async Task<IActionResult> GetAll() {
            var categories = await _categoryRepo.GetAllAsync();
            var categoryDto = categories.Select(s => s.ToCategoryDto());
            return Ok(categoryDto);
        }

        [HttpGet]
        [Route("get/{id}")]
        // This function will return a specific category from the database according to its Id
        public async Task<IActionResult> GetById([FromRoute] int id) {
            var category = await _categoryRepo.GetByIdAsync(id);
            if(category == null) {
                return NotFound();
            }
            return Ok(category.ToCategoryDto());
        }

        [HttpPost]
        [Route("create")]
        // This function will store a brand new category to the database
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryDto categoryDto) {
            if(!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            var categoryModel = categoryDto.ToCategoryFromCreate();
            await _categoryRepo.CreateAsync(categoryModel);

            return CreatedAtAction(nameof(GetById), new { id = categoryModel.Id }, categoryModel.ToCategoryDto());
        }

        [HttpPut]
        [Route("update/{id}")]
        // This function will update the name of an existing category
        public async Task<IActionResult> UpdateCategory([FromRoute] int id, [FromBody] UpdateCategoryDto categoryDto) {
            if(!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            var categoryModel = await _categoryRepo.UpdateAsync(id, categoryDto);
            if(categoryModel == null) {
                return NotFound();
            }

            return Ok(categoryModel.ToCategoryDto());
        }
    }
}