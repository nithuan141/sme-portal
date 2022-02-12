using AIOFT.User.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AIOFT.User.Data;

namespace AIOFT.User.Data.Repository
{
    /// <summary>
    /// The repository class for Locatio.
    /// </summary>
    public class InvestmentRepository : RepositoryBase<AIOFT.User.Data.Models.Investment>, IInvestmentRepository
    {
        /// <summary>
        /// Constructor of location repository class.
        /// </summary>
        /// <param name="repositoryContext">The database context instance.</param>
        public InvestmentRepository(UserDBContext repositoryContext)
            : base(repositoryContext)
        {
        }
    }
}
