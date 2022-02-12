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
    public class InvestmentController : ControllerBase
    {
        // The Investment service instance
        private readonly IInvestmentRepository investmentRepository;
        private readonly IMapper mapper;

        public InvestmentController(IInvestmentRepository _investmentRepository, IMapper _mapper)
        {
            this.investmentRepository = _investmentRepository;
            this.mapper = _mapper;
        }

        [HttpPost]
        [Authorize(Roles = Roles.ADMIN)]
        public async Task<IActionResult> Post([FromBody] InvestmentDTO investmentDto)
        {
            var investmentEntity = this.mapper.Map<AIOFT.User.Data.Models.Investment>(investmentDto);
            var result  = await this.investmentRepository.Create(investmentEntity);
            this.investmentRepository.Save();
            return Ok(this.mapper.Map<InvestmentDTO>(result));
        }

        [HttpPut]
        [Authorize(Roles = Roles.ADMIN)]
        public IActionResult Put([FromBody] InvestmentDTO investmentDto)
        {
            var investmentEntity = this.mapper.Map<AIOFT.User.Data.Models.Investment>(investmentDto);
            var result = this.investmentRepository.Update(investmentEntity);
            this.investmentRepository.Save();
            return Ok(this.mapper.Map<InvestmentDTO>(result));
        }

        [HttpDelete]
        [Authorize(Roles = Roles.ADMIN)]
        public IActionResult Delete([FromBody] InvestmentDTO investmentDto)
        {
            var investmentEntity = this.mapper.Map<AIOFT.User.Data.Models.Investment>(investmentDto);
            this.investmentRepository.Delete(investmentEntity);
            this.investmentRepository.Save();
            return Ok(true);
        }

        [HttpGet]
        [Authorize]
        [Route("{userId}/{id}")]
        public async Task<IActionResult> Get(Guid? userId, long? id)
        {
            
            var result = await this.investmentRepository.FindByCondition(x=>(!userId.HasValue || x.UserId == userId) && (!id.HasValue || x.Id == id)).ToListAsync();
            var investments = this.mapper.Map<IList<AIOFT.User.Data.Models.Investment>>(result);

            return Ok(investments);
        }


        [HttpGet]
        [Authorize(Roles = Roles.ADMIN)]
        public async Task<IActionResult> GetAll()
        {

            var result = await this.investmentRepository.FindAll().ToListAsync();
            var investments = this.mapper.Map<IList<AIOFT.User.Data.Models.Investment>>(result);

            return Ok(investments);
        }
    }
}
