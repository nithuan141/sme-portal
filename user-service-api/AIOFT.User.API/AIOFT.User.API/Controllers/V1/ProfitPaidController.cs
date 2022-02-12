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
using AIOFT.User.Data;

namespace AIOFT.User.API.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class ProfitPaidController : ControllerBase
    {
        // The ProfitPaid service instance
        private readonly IProfitPaidRepository profitPaidRepository;
        private readonly IMapper mapper;
        private readonly UserDBContext userDBContext;

        public ProfitPaidController(IProfitPaidRepository _profitPaidRepository, IMapper _mapper, UserDBContext _userDBContext)
        {
            this.profitPaidRepository = _profitPaidRepository;
            this.mapper = _mapper;
            this.userDBContext = _userDBContext;
        }

        [HttpPost]
        [Authorize(Roles = Roles.ADMIN)]
        public async Task<IActionResult> Post([FromBody] ProfitPaidDTO profitPaidDto)
        {
            var profitPaidEntity = this.mapper.Map<AIOFT.User.Data.Models.ProfitPaid>(profitPaidDto);
            var result  = await this.profitPaidRepository.Create(profitPaidEntity);
            this.profitPaidRepository.Save();
            return Ok(this.mapper.Map<ProfitPaidDTO>(result));
        }

        [HttpPut]
        [Authorize(Roles = Roles.ADMIN)]
        public IActionResult Put([FromBody] ProfitPaidDTO profitPaidDto)
        {
            var profitPaidEntity = this.mapper.Map<AIOFT.User.Data.Models.ProfitPaid>(profitPaidDto);
            var result = this.profitPaidRepository.Update(profitPaidEntity);
            this.profitPaidRepository.Save();
            return Ok(this.mapper.Map<ProfitPaidDTO>(result));
        }

        [HttpDelete]
        [Authorize(Roles = Roles.ADMIN)]
        public IActionResult Delete([FromBody] ProfitPaidDTO profitPaidDto)
        {
            var profitPaidEntity = this.mapper.Map<AIOFT.User.Data.Models.ProfitPaid>(profitPaidDto);
            this.profitPaidRepository.Delete(profitPaidEntity);
            this.profitPaidRepository.Save();
            return Ok(true);
        }

        [HttpGet]
        [Authorize]
        [Route("{userId}/{id}")]
        public async Task<IActionResult> Get(Guid? userId, long? id)
        {
            
            var result = await this.profitPaidRepository.FindByCondition(x=>(!userId.HasValue || x.UserId == userId) && (!id.HasValue || x.Id == id)).ToListAsync();
            var profitPaids = this.mapper.Map<IList<AIOFT.User.Data.Models.ProfitPaid>>(result);

            return Ok(profitPaids);
        }


        [HttpGet]
        [Authorize(Roles = Roles.ADMIN)]
        public async Task<IActionResult> GetAll()
        {
            var data = from p in this.userDBContext.ProfitPaid
                       join inv in this.userDBContext.Investment on p.InvestmentId equals inv.Id
                       select new
                       {
                           p.UserId,
                           inv.InvestorName,
                           inv.InvestedAmount,
                           inv.InvestedDate,
                           inv.InvetsmentType,
                           inv.ProfitPercentage,
                           p.PaidDate,
                           p.PaidAmount,
                           p.Id
                       };

            var result = await data.ToListAsync();
            return Ok(result);
        }


        [HttpGet]
        [Authorize(Roles = Roles.ADMIN)]
        [Route("profitpermonth")]
        public async Task<IActionResult> GetDashboard()
        {
            var data = from p in this.userDBContext.ProfitPaid
                       group p by p.PaidDate.Month into m
                       select new
                       {
                          Month= m.First().PaidDate.Month,
                          Profit= m.Sum(x=>x.PaidAmount)
                       };

            var result = await data.ToListAsync();
            return Ok(result);
        }


        [HttpGet]
        [Authorize(Roles = Roles.ADMIN)]
        [Route("investmentpermonth")]
        public async Task<IActionResult> GetInvestment()
        {
            var data = from p in this.userDBContext.Investment
                       group p by p.InvestedDate.Month into m
                       select new
                       {
                           Month = m.First().InvestedDate.Month,
                           Profit = m.Sum(x => x.InvestedAmount)
                       };

            var result = await data.ToListAsync();
            return Ok(result);
        }

    }
}
