using AIOFT.User.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AIOFT.User.Data.Repository
{
    public interface IUserRepository: IRepositoryBase<AIOFT.User.Data.Models.User>
    {
    }
}
