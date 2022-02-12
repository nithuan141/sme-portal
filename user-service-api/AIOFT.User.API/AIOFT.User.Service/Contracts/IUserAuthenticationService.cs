using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AIOFT.User.DTO;

namespace AIOFT.User.Service
{
    public interface IUserAuthenticationService
    {
        /// <summary>
        /// Authenticating the given user and returning the access token.
        /// </summary>
        /// <param name="user">The user object.</param>
        /// <returns>User data with Access Token</returns>
        Task<UserDTO> Authenticate(LoginDTO user, bool reAuthenticate = false);

        /// <summary>
        /// Generates refresh token.
        /// </summary>
        /// <returns>Token String</returns>
        string GenerateRefreshToken();

        /// <summary>
        /// Generate jwt token.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        string GenerateSecurityToken(UserDTO user);
    }
}
