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
    public class CommentsController : ControllerBase
    {
        // The Comments service instance
        private readonly ICommentsRepository commentsRepository;
        private readonly IMapper mapper;

        public CommentsController(ICommentsRepository _commentsRepository, IMapper _mapper)
        {
            this.commentsRepository = _commentsRepository;
            this.mapper = _mapper;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] CommentsDTO commentsDto)
        {
            var commentsEntity = this.mapper.Map<AIOFT.User.Data.Models.Comments>(commentsDto);
            var result  = await this.commentsRepository.Create(commentsEntity);
            this.commentsRepository.Save();
            return Ok(this.mapper.Map<CommentsDTO>(result));
        }

        [HttpPut]
        [Authorize(Roles = Roles.ADMIN)]
        public IActionResult Put([FromBody] CommentsDTO commentsDto)
        {
            var commentsEntity = this.mapper.Map<AIOFT.User.Data.Models.Comments>(commentsDto);
            var result = this.commentsRepository.Update(commentsEntity);
            this.commentsRepository.Save();
            return Ok(this.mapper.Map<CommentsDTO>(result));
        }

        [HttpDelete]
        [Authorize(Roles = Roles.ADMIN)]
        public IActionResult Delete([FromBody] CommentsDTO commentsDto)
        {
            var commentsEntity = this.mapper.Map<AIOFT.User.Data.Models.Comments>(commentsDto);
            this.commentsRepository.Delete(commentsEntity);
            this.commentsRepository.Save();
            return Ok(true);
        }

        [HttpGet]
        [Authorize]
        [Route("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var result = await this.commentsRepository.FindByCondition(x=>x.Id == id).FirstOrDefaultAsync();
            var commentss = this.mapper.Map<AIOFT.User.Data.Models.Comments>(result);

            return Ok(commentss);
        }

        [HttpGet]
        [Authorize]
        [Route("{courseId}")]
        public async Task<IActionResult> GetAll(Guid courseId)
        {
            var result = await this.commentsRepository.FindByCondition(x => x.CourseId == courseId).ToListAsync();
            var commentss = this.mapper.Map<IList<AIOFT.User.Data.Models.Comments>>(result);

            return Ok(commentss);
        }
    }
}
