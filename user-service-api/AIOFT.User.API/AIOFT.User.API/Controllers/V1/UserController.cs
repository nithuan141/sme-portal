using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AIOFT.User.DTO;
using AIOFT.User.Service;
using Microsoft.AspNetCore.Authorization;
using AIOFT.User.API.Shared;

namespace AIOFT.User.API.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        // The User service instance
        private readonly IUserService userService;

        public UserController(IUserService usrService)
        {
            this.userService = usrService;
        }

        // POST api/User
        [HttpPost]
        [Authorize(Roles = Roles.ADMIN)]
        public async Task<IActionResult> Post([FromBody] UserDTO userDto)
        {
            var user = await this.userService.GetUser(userDto.Email, userDto.Phone);
            if(user != null)
            {
                throw new Exception("The user is already exist with given email or phone number.");
            }
            var result  = await this.userService.Create(userDto);

            return Ok(result);
        }

        [HttpPut]
        [Authorize(Roles = Roles.ADMIN)]
        public IActionResult Put([FromBody] UserDTO userDTO)
        {
            this.userService.Update(userDTO);
            return Ok(userDTO);
        }

        [HttpDelete]
        [Authorize(Roles = Roles.ADMIN)]
        public IActionResult Delete([FromBody] UserDTO userDTO)
        {
            this.userService.Delete(userDTO);
            return Ok(true);
        }

        [HttpGet]
        [Authorize]
        [Route("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {

            var result = await this.userService.GetUserById(id);

            return Ok(result);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {

            var result = await this.userService.FetchAllUsers();

            return Ok(result);
        }
    }
}
