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
    public class CommentsRepository : RepositoryBase<AIOFT.User.Data.Models.Comments>, ICommentsRepository
    {
        /// <summary>
        /// Constructor of location repository class.
        /// </summary>
        /// <param name="repositoryContext">The database context instance.</param>
        public CommentsRepository(UserDBContext repositoryContext)
            : base(repositoryContext)
        {
        }
    }
}
