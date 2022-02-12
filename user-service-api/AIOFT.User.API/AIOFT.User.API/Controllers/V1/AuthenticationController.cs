using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AIOFT.User.DTO;
using AIOFT.User.Service;
using ApiBase.Common;
using System.IdentityModel.Tokens.Jwt;

namespace AIOFT.User.API.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/user")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IUserAuthenticationService authenticationService;
        private readonly IUserService userService;

        /// <summary>
        /// The authentication controller constructor which calls upon instantiating the controller.
        /// </summary>
        /// <param name="_authenticationService">Injected instance of UserAuthenticationService.</param>
        public AuthenticationController(IUserAuthenticationService _authenticationService, IUserService _userService)
        {
            this.authenticationService = _authenticationService;
            this.userService = _userService;
        }

        /// <summary>
        /// Authentication endpoint.
        /// </summary>
        /// <param name="user">The user details - user name and password. </param>
        /// <returns></returns>
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Post([FromBody] LoginDTO user)
        {
            var loggedInUser = await this.authenticationService.Authenticate(user);
            if(loggedInUser == null)
            {
                return BadRequest(new { message = "Username or password is incorrect" });
            }
            else
            {
                loggedInUser.RefreshToken = this.authenticationService.GenerateRefreshToken();
                loggedInUser.RefreshTokenExpiry = DateTime.UtcNow.AddDays(1);

                this.userService.Update(loggedInUser);
                loggedInUser.Password = null;
                return Ok(loggedInUser);
            }
        }

        /// <summary>
        /// Authentication endpoint which validates the given token attached in header.
        /// </summary>
        /// <param name="user">The user details - user name and password. </param>
        /// <returns></returns>
        [HttpPost]
        [Route("validate")]
        public async Task<IActionResult> ValidateToken()
        {
            var user = await this.HttpContext.GetUserToken();

            if (user.ValidTo > DateTime.UtcNow)
            {
                var userObj = await this.GetUser(user);
                var loggedInUser = await this.authenticationService.Authenticate(new LoginDTO(){ Email=userObj.Email, Password= userObj.Password}, true);

                if (loggedInUser == null)
                {
                    return BadRequest(new { message = "Invalid Token" });
                }
                else
                {
                    loggedInUser.Password = null;
                    return Ok(loggedInUser);
                }
            }
            else
            {
                return BadRequest(new { message = "Token Expired" });
            }
        }

        /// <summary>
        /// Authentication endpoint which validates refresh token and returns jwt.
        /// </summary>
        /// <param name="refreshToken">The refresh token. </param>
        /// <returns></returns>
        [HttpPost]
        [Route("refreshtoken")]
        public async Task<IActionResult>RefreshToken([FromBody] RFT rft)
        {
            var userToken = await this.HttpContext.GetUserToken();

            var user = await GetUser(userToken);
            var loggedInUser = await this.authenticationService.Authenticate(new LoginDTO() { Email = user.Email, Password = user.Password }, true);

            if (loggedInUser == null
                || loggedInUser.RefreshToken != rft.RefreshToken
                || string.IsNullOrEmpty(loggedInUser.RefreshToken)
                || !loggedInUser.RefreshTokenExpiry.HasValue
                || loggedInUser.RefreshTokenExpiry < DateTime.UtcNow)
            {
                return BadRequest(new { message = "Invalid Token" });
            }
            else
            {
                loggedInUser.Token = this.authenticationService.GenerateSecurityToken(loggedInUser);
                loggedInUser.Password = null;

                return Ok(loggedInUser);
            } 
        }

        /// <summary>
        /// Revoke the refresh token
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("revoketoken")]
        public async Task<IActionResult> RevokeToken()
        {
            var userToken = await this.HttpContext.GetUserToken();
            var userObj = await this.GetUser(userToken);

            if (userObj == null)
            {
                return BadRequest(new { message = "Invalid Token" });
            }
            else
            {
                userObj.RefreshToken = string.Empty;

                return Ok("revoked");
            }
        }

        /// <summary>
        /// Returns the user object form the jwt token.
        /// </summary>
        /// <param name="user">JWT</param>
        /// <returns>User</returns>
        private async Task<UserDTO> GetUser(JwtSecurityToken user)
        {
            var email = user.Claims.First(claim => claim.Type == "email")?.Value;
            var userObj = await this.userService.GetUser(email, "");

            return userObj;
        }
    }

    public class RFT
    {
        public string RefreshToken { get; set; }
    }
}
