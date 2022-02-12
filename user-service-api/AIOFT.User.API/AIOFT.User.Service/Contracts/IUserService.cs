﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AIOFT.User.DTO;

namespace AIOFT.User.Service
{
    public interface IUserService
    {
        /// <summary>
        /// Create a new user and returns the created user object.
        /// </summary>
        /// <param name="userDTO"></param>
        /// <returns></returns>
        Task<UserDTO> Create(UserDTO userDTO);

        /// <summary>
        /// Update a user's details.
        /// </summary>
        /// <param name="userDTO">The user object.</param>
        void Update(UserDTO userDTO);

        /// <summary>
        /// Delete a given user.
        /// </summary>
        /// <param name="userDTO">The user object.</param>
        void Delete(UserDTO userDTO);

        /// <summary>
        /// Fetches and return all the users.
        /// </summary>
        /// <param name="userDTO"></param>
        /// <returns>List of users.</returns>
        Task<IList<UserDTO>> FetchAllUsers();

        /// <summary>
        /// Featches and returns a single user.
        /// </summary>
        /// <param name="email">Email</param>
        /// <param name="phone">Phone</param>
        /// <returns>A single user object.</returns>
        Task<UserDTO> GetUser(string email, string phone);

        /// <summary>
        /// Get a user by the id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<UserDTO> GetUserById(Guid id);
    }
}
