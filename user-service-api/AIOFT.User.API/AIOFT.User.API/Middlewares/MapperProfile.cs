using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AIOFT.User.DTO;

namespace AIOFT.User.API.Middlewares
{
    /// <summary>
    /// Automapper mapper class.
    /// </summary>
    public class MapperProfile : Profile
    {
        /// <summary>
        /// Mapper profile constructor.
        /// </summary>
        public MapperProfile()
        {
            this.CreateMap<AIOFT.User.Data.Models.User, UserDTO>().ReverseMap();
            this.CreateMap<AIOFT.User.Data.Models.Comments, CommentsDTO>().ReverseMap();
            this.CreateMap<AIOFT.User.Data.Models.Course, CourseDTO>().ReverseMap();
            this.CreateMap<AIOFT.User.Data.Models.CourseHistory, CourseHistoryDTO>().ReverseMap();
            this.CreateMap<AIOFT.User.Data.Models.Investment, InvestmentDTO>().ReverseMap();
            this.CreateMap<AIOFT.User.Data.Models.ProfitPaid, ProfitPaidDTO>().ReverseMap();
        }
    }
}
