using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AIOFT.User.Data.Repository;
using AIOFT.User.DTO;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace AIOFT.User.Service
{
    public class UserAuthenticationService: IUserAuthenticationService
    {
        private readonly string secret;
        private readonly string expDate;
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;

        /// <summary>
        /// Authentication service constructor.
        /// </summary>
        /// <param name="_configuration">Instance of the configuration.</param>
        /// <param name="_userRepository">Instance of the user repository.</param>
        /// <param name="_mapper">Automapper object.</param>
        public UserAuthenticationService(IConfiguration _configuration, IUserRepository _userRepository, IMapper _mapper)
        {
            this.userRepository = _userRepository;
            this.mapper = _mapper;
            secret = _configuration.GetSection("JWT:secret").Value;
            expDate = _configuration.GetSection("JWT:expirationInMinutes").Value;
        }

        /// <summary>
        /// Authenticating the given user and returning the access token.
        /// </summary>
        /// <param name="user">The user object.</param>
        /// <returns>User data with Access Token</returns>
        public async Task<UserDTO> Authenticate(LoginDTO user, bool reAuthenticate = false)
        {
            var loggedInuser = await this.GetUser(user.Email, user.Password, reAuthenticate);

            if (loggedInuser != null)
            {
                loggedInuser.Token = this.GenerateSecurityToken(loggedInuser);
            }

            return loggedInuser;
        }

        /// <summary>
        /// Generates refresh token.
        /// </summary>
        /// <returns>Token String</returns>
        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        /// <summary>
        /// Generating the JWT token.
        /// </summary>
        /// <param name="user">The user object.</param>
        /// <returns></returns>
        public string GenerateSecurityToken(UserDTO user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Role),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(double.Parse(expDate)),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        /// <summary>
        /// Read and returns the user by given user name and password.
        /// </summary>
        /// <param name="userName">The User Name.</param>
        /// <param name="password">The Password.</param>
        /// <returns></returns>
        private async Task<UserDTO> GetUser(string userName, string password, bool reAuthenticate)
        {
            var encryptedPassword = PasswordHelper.Encrypt(password);
            var user = await this.userRepository.FindByCondition(user => (user.Password.Equals(encryptedPassword) || reAuthenticate) && (user.Email.Equals(userName))).FirstOrDefaultAsync();
            return (this.mapper.Map<UserDTO>(user));
        }
    }
}
