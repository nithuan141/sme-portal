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
    public class CourseHistoryController : ControllerBase
    {
        // The CourseHistory service instance
        private readonly ICourseHistoryRepository courseHistoryRepository;
        private readonly IMapper mapper;

        public CourseHistoryController(ICourseHistoryRepository _courseHistoryRepository, IMapper _mapper)
        {
            this.courseHistoryRepository = _courseHistoryRepository;
            this.mapper = _mapper;
        }

        [HttpPost]
        [Authorize(Roles = Roles.ADMIN)]
        public async Task<IActionResult> Post([FromBody] CourseHistoryDTO courseHistoryDto)
        {
            var courseHistoryEntity = this.mapper.Map<AIOFT.User.Data.Models.CourseHistory>(courseHistoryDto);
            var result  = await this.courseHistoryRepository.Create(courseHistoryEntity);
            this.courseHistoryRepository.Save();
            return Ok(this.mapper.Map<CourseHistoryDTO>(result));
        }

        [HttpPut]
        [Authorize(Roles = Roles.ADMIN)]
        public IActionResult Put([FromBody] CourseHistoryDTO courseHistoryDto)
        {
            var courseHistoryEntity = this.mapper.Map<AIOFT.User.Data.Models.CourseHistory>(courseHistoryDto);
            var result = this.courseHistoryRepository.Update(courseHistoryEntity);
            this.courseHistoryRepository.Save();
            return Ok(this.mapper.Map<CourseHistoryDTO>(result));
        }

        [HttpDelete]
        [Authorize(Roles = Roles.ADMIN)]
        public IActionResult Delete([FromBody] CourseHistoryDTO courseHistoryDto)
        {
            var courseHistoryEntity = this.mapper.Map<AIOFT.User.Data.Models.CourseHistory>(courseHistoryDto);
            this.courseHistoryRepository.Delete(courseHistoryEntity);
            this.courseHistoryRepository.Save();
            return Ok(true);
        }

        [HttpGet]
        [Authorize]
        [Route("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            
            var result = await this.courseHistoryRepository.FindByCondition(x=>x.Id == id).FirstOrDefaultAsync();
            var courseHistorys = this.mapper.Map<AIOFT.User.Data.Models.CourseHistory>(result);

            return Ok(courseHistorys);
        }

        [HttpGet]
        [Authorize]
        [Route("{courseId}/{userId}")]
        public async Task<IActionResult> GetAll(Guid courseId, Guid? userId)
        {

            var result = await this.courseHistoryRepository.FindByCondition(x => x.CourseId == courseId && (!userId.HasValue || x.UserId == userId)).ToListAsync();
            var courseHistorys = this.mapper.Map<IList<AIOFT.User.Data.Models.CourseHistory>>(result);

            return Ok(courseHistorys);
        }
    }
}
