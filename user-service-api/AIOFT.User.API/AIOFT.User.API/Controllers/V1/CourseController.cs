using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AIOFT.User.DTO;
using AIOFT.User.Service;
using AIOFT.User.Data.Repository;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using AIOFT.User.API.Shared;
using Microsoft.EntityFrameworkCore;

namespace AIOFT.User.API.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        // The Course service instance
        private readonly ICourseRepository courseRepository;
        private readonly IMapper mapper;

        public CourseController(ICourseRepository _courseRepository, IMapper _mapper)
        {
            this.courseRepository = _courseRepository;
            this.mapper = _mapper;
        }

        [HttpPost]
        [Authorize(Roles = Roles.ADMIN)]
        public async Task<IActionResult> Post([FromBody] CourseDTO courseDto)
        {
            var courseEntity = this.mapper.Map<AIOFT.User.Data.Models.Course>(courseDto);
            var result  = await this.courseRepository.Create(courseEntity);
            this.courseRepository.Save();
            return Ok(this.mapper.Map<CourseDTO>(result));
        }

        [HttpPut]
        [Authorize(Roles = Roles.ADMIN)]
        public IActionResult Put([FromBody] CourseDTO courseDto)
        {
            var courseEntity = this.mapper.Map<AIOFT.User.Data.Models.Course>(courseDto);
            var result = this.courseRepository.Update(courseEntity);
            this.courseRepository.Save();
            return Ok(this.mapper.Map<CourseDTO>(result));
        }

        [HttpDelete]
        [Authorize(Roles = Roles.ADMIN)]
        public IActionResult Delete([FromBody] CourseDTO courseDto)
        {
            var courseEntity = this.mapper.Map<AIOFT.User.Data.Models.Course>(courseDto);
            this.courseRepository.Delete(courseEntity);
            this.courseRepository.Save();
            return Ok(true);
        }

        [HttpGet]
        [Authorize]
        [Route("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            
            var result = await this.courseRepository.FindByCondition(x=>x.Id == id).FirstOrDefaultAsync();
            var courses = this.mapper.Map<AIOFT.User.Data.Models.Course>(result);

            return Ok(courses);
        }

        [HttpGet]
        [Authorize]
        [Route("{searchText}")]
        public async Task<IActionResult> GetAll(string searchText)
        {

            var result = await this.courseRepository.FindByCondition(x => x.Descriptions.Contains(searchText) || x.Title.Contains(searchText)).ToListAsync();
            var courses = this.mapper.Map<IList<AIOFT.User.Data.Models.Course>>(result);

            return Ok(courses);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllCourse()
        {

            var result = await this.courseRepository.FindAll().ToListAsync();
            var courses = this.mapper.Map<IList<AIOFT.User.Data.Models.Course>>(result);

            return Ok(courses);
        }
    }
}
